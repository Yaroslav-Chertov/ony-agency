import express from 'express';
import path from 'node:path';
import chalk from 'chalk';
import routes from './routes/webRoutes.js';
import { getPageComponent, render } from './utils/jsx.js';
import fileUpload from 'express-fileupload';
import { initNotifier, sendMessage } from './services/bot.js';
// import helmet from 'helmet';

const port = process.env.PORT || 3001;
process.env.URL = process.env.URL || 'http://localhost:' + port;
const app = express();

app.use('/favicon.ico', express.static(path.resolve('./public/assets/favicon/favicon.ico')));
app.use('/assets', express.static(path.resolve('./_build/assets')));
app.use('/', express.static(path.resolve('./public')));
app.use(fileUpload());

// TODO: express-rate-limit
// app.use(cookieParser()); // Защита приложения (заголовки безопасности)
/* app.use(helmet({
    contentSecurityPolicy: false,
})); // Защита приложения (заголовки безопасности) */
// app.use(cors());   // Разрешение кросс-доменных запросов
app.use(express.json()); // Парсинг JSON данных

app.use('/', routes);

initNotifier()

const page404 = await getPageComponent('404');
// Обработка 404 ошибок для несуществующих маршрутов
app.use(async (req, res, next) => {
    const rendered = await render(page404.default, {});
    return res.status(404).send(rendered);
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err);
    sendMessage(`Ошибка 500 по адресу https://ony.ru${req.url} требует внимания. Стек: ${err.message}`);
    return res.status(500).sendFile(path.resolve('./public/500.html'));
    // return res.status(500).json({ message: 'MIDDLEWARE: Server Error 500', details: err });
});

app.listen(port, () => {
    console.log(`-------------------------------------`);
    console.log(`${chalk.bgHex('#325EE0')('SERVER:')} http://localhost:${port}`);
    console.log(`-------------------------------------`);
    process.send?.('started')
});
