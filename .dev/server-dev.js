import https from 'https';
import express from 'express';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';

import dns from 'node:dns';
import os from 'node:os';

const port = process.env.PORT;
const app = express();
let server = app;
const key = fs.existsSync(process.env.HTTPSKEY) && fs.readFileSync(path.resolve(process.env.HTTPSKEY || '')).toString();
const cert = fs.existsSync(process.env.HTTPSCRT) && fs.readFileSync(path.resolve(process.env.HTTPSCRT || '')).toString();
const isHTTPS = key && cert;
const IP = await new Promise(r => { dns.lookup(os.hostname(), { family: 4 }, (err, addr) => { r(addr); }); });

if (isHTTPS) {
    server = https.createServer({ key, cert }, app);
}

// TODO: улучшить middleware статики и настраивать папки и файлы, которые не будут отдаваться как статичные
app.use('/', express.static(path.resolve(process.env.BUILD_FOLDER)));

server.listen(port, () => {
    console.log(`-------------------------------------`);
    isHTTPS && console.log(`${chalk.hex('#325EE0')('HTTPS MODE:')}    enabled`);
    console.log(`${chalk.hex('#325EE0')('Static server:')} http${isHTTPS ? 's' : ''}://localhost:${port}`);
    console.log(`${chalk.hex('#325EE0')('Network      :')} http://${IP}:${port}`);
    console.log(`-------------------------------------`);
    process.send?.('started')
});
