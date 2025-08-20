// CONTROLLERS
// Обработчики маршрутов. Здесь мы контролируем запросы данных, вызываем рендеринг и возвращаем результат в виде готового html или ошибки 404/500 (для ошибок возвращается функция next())
import { readFile } from 'node:fs/promises';
import { getData } from '#_/server/services/data.js';
import { getPageComponent, render } from '#_/server/utils/jsx.js';
import testResponses from '../utils/testResponses.js';
import { clearCache } from '../utils/cache.js';

const isDevHost = (req) => {
    return req.hostname === 'localhost' || req.hostname === 'ony.devcloud.one'
}

// Главная и все остальные страницы, для которых нет контроллера
const pageController = async (req, res, next) => {
    console.time('pageLoad');
    try {
        const debugPage = req.params.page === '_debug';
        if (req.params.page?.[0] === '_' && !debugPage) {
            console.timeEnd('pageLoad');
            return next();
        }

        const pageSlug = req.params.page || 'index';
        const reqDataUrl = pageSlug === 'index' ? 'page/home' : 'page/' + pageSlug;
        const pageComponent = await getPageComponent([pageSlug, '_static-page']);

        if (pageComponent.devOnly && !isDevHost(req)) {
            return next();
        }

        if (!pageComponent) {
            console.timeEnd('pageLoad');
            return next();
        }

        const data = await getData(reqDataUrl);

        if (!pageComponent.staticPage && !data) {
            console.log('asdasdasd');
            console.timeEnd('pageLoad');
            return next();
        }

        const serverInfo = {
            hostname: req.headers.host
        }

        const rendered = await render(pageComponent.default, { data, serverInfo });

        if (rendered === false) {
            console.timeEnd('pageLoad');
            return next('Rendering error');
        }

        console.timeEnd('pageLoad');
        return res.send(rendered);
    } catch (error) {
        console.timeEnd('workPageLoad');
        console.log('Error on rendering page component', error);
        return next(error, req);
    }
}

const workController = async (req, res, next) => {
    console.time('workPageLoad');
    try {
        const pageSlug = req.params.page || 'index';
        const reqDataUrl = pageSlug === 'index' ? 'projects' : 'work/' + pageSlug;

        if (pageSlug === 'details') {
            console.timeEnd('workPageLoad');
            return next();
        }

        const pageComponent = await getPageComponent(['work/' + pageSlug, 'work/details']);
        
        if (!pageComponent || pageComponent.devOnly && !isDevHost(req)) {
            return next();
        }

        const data = await getData(reqDataUrl);

        if (!pageComponent.staticPage && !data) {
            console.timeEnd('workPageLoad');
            return next();
        }

        const serverInfo = {
            hostname: req.headers.host
        }

        const rendered = await render(pageComponent.default, { data, serverInfo });

        if (rendered === false) {
            console.timeEnd('workPageLoad');
            return next();
        }

        console.timeEnd('workPageLoad');
        return res.send(rendered);
    } catch (error) {
        console.log('Error on rendering page component', error);
        console.timeEnd('workPageLoad');
        return next(error, req);
    }
}

const clientController = async (req, res, next) => {
    try {
        const pageSlug = req.params.page;
        if (!pageSlug) return next();

        const reqDataUrl = 'client/' + pageSlug;
        if (pageSlug === 'details') return next();

        const pageComponent = await getPageComponent('work/index');

        if (!pageComponent || pageComponent.devOnly && !isDevHost(req)) {
            return next();
        }

        const data = await getData(reqDataUrl);

        if (!pageComponent.staticPage && !data) return next();

        const serverInfo = {
            hostname: req.headers.host
        }

        const rendered = await render(pageComponent.default, { data, serverInfo });

        /* if (rendered === false) return next('Rendering error'); */

        return res.send(rendered);
    } catch (error) {
        console.log('Error on rendering page component', error);
        return next(error, req);
    }
}

const cacheController = async (req, res, next) => {
    try {
        if (req.query.key !== 'devclear') return res.status(401).json({ code: 401, message: 'Wrong key code' })

        const cacheStatus = await clearCache();

        return res.json({
            code: 200,
            message: cacheStatus
        });
    } catch (e) {
        console.error('Error in cacheController');
        console.error(e);
    }

    return next()
}

const redirectsMiddleware = async (req, res, next) => {
    try {
        const redirects = await getData('redirects', { cacheTTL: 1000 });
        const redirectTo = redirects.find(r => r.from === req.path);

        if (!redirectTo) return next();

        return res.status(redirectTo.statusCode).redirect(redirectTo.to);
    } catch (e) {
        console.error('Error on loading redirects');
        console.error(e);
    }

    return next()
}

const testApiController = (req, res, next) => {
    let r;

    switch (req.params.form) {
        case 'send_brief':
            r = testResponses.SendBriefSuccess;
            return res.status(r.status).json(r.payload);

        case 'send_consultation':
            r = testResponses.SendAbortError;
            return res.status(r.status).json(r.payload);

        default:
            return res.json(req.body);
    }
}

export {
    pageController,
    workController,
    clientController,
    testApiController,

    redirectsMiddleware,
    cacheController
};