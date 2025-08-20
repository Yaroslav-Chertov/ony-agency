import fs from 'node:fs';
import path from 'node:path';

const writeFile = (folder, fileName, data) => {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.resolve(folder, fileName), data);
}

const injectAtBodyEnd = (page, data) => {
    return page.replace(/<\/body>/gi, `${data}</body>`);
}

let renderCount = 0;
const renderPage = async (Page, filePath) => {
    const pageString = '<!DOCTYPE HTML>' + (await Page({data: renderCount++}).catch(e => {
        // TODO: стандартная функция для всех ошибок?
        console.error(e.stack);
        console.error(filePath);
        // TODO: нормальная страница ошибки
        return `<html><body><pre>${filePath}\n\n${e.stack}</pre></body></html>`;
    }));

    return pageString;
}

const injectLivereloader = async (staticPage) => {
    const liveReloader = (await import('./live-reloader/client.js')).default;
    return injectAtBodyEnd(staticPage, liveReloader(process.env.WSPORT));
}


const renderStructuredPages = async (done) => {
    // console.time('Render static pages');
    const pagesPath = path.resolve('src/pages');
    const pages = fs.readdirSync(pagesPath, { recursive: true, withFileTypes: true });
    const filesOnly = pages.filter(p => !p.isDirectory());
    const filesCount = pages.length;
    let renderedCount = 0;

    //карта путей к новым папкам
    for await (const file of filesOnly) {
        let fileRelativeFolder = path.relative(pagesPath, file.parentPath);

        fileRelativeFolder = fileRelativeFolder ? '/' + fileRelativeFolder : fileRelativeFolder;
        const filePath = [fileRelativeFolder, file.name].join('/');

        const loadPath = `../src/pages${filePath}`;
        const PageComponent = (await import(`${loadPath}?reload`).catch(err => {
            console.error(err + '.\nPath:' + loadPath);
            return {};
        })).default;

        if (!PageComponent) return done?.();

        const staticPage = await renderPage(PageComponent, file);
        const staticPageWithLiveReloader = await injectLivereloader(staticPage);
        let pageFolder = filePath.split('.').slice(0, -1).join('.');
        let filePathCleared = (pageFolder === '/index' ? '/' : pageFolder).slice(1);

        // путь, название файла и данные
        writeFile(path.resolve(process.env.BUILD_FOLDER, filePathCleared), 'index.html', staticPageWithLiveReloader);

        renderedCount++

        if (renderedCount === filesCount) {
            // console.timeEnd('Render static pages');
            process?.send?.('completed');
            done?.();
        }
    }

    done();
}

const renderStaticTask = async (done) => {
    try {
        await renderStructuredPages(done);
    } catch (error) {
        console.log('Render error', error);
    }
}

// WARN: выключен чтобы не срабатывал с кастомным сервером, который является субпроцессом
// Изначально нужен был чтобы избавиться от кеширования компонентов при асинхронном импорте
// process.send && renderStructuredPages();

export default renderStructuredPages;
export {
    renderPage,
    injectAtBodyEnd,
    injectLivereloader,
    renderStaticTask
};
