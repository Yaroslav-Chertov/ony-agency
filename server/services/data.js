import { readFile } from 'node:fs/promises';
import { saveFile } from '../utils/fs.js';
import path from 'node:path';
import { checkCacheTTL, readFromCache, updateCache } from '#_/server/utils/cache.js';

const cacheResponse = process.env.CACHE_API_RESPONSE === 'true';

const request = async (reqUrl, opts) => await fetch(reqUrl, {
        ...opts
    })
    .then(async r => {
        if (!r.ok) return false

        return r.json()
    })
    .catch(e => {
        console.log('Error on getting data', e)
        return false;
    });

const getData = async (url, options) => {
    const reqOptions = {
        locale: 'ru',
        cacheTTL: +process.env.CACHE_TTL || 60,
        ...options
    }
    // TODO: обработка ошибок от АПИ
    const reqUrl = `${process.env.API_URL}${url}?loc=${reqOptions.locale}`;
    console.log('Get data URL', reqUrl);

    if (cacheResponse) {
        const cacheData = await readFromCache(url);

        if (!cacheData) { // нет данных в кэше, возвращаем результат запроса, когда он выполнится
            const res = await request(reqUrl);

            if (res) {
                updateCache(url, res) // обновляем в фоновом режиме
            }

            return res;
        }

        const cacheValid = checkCacheTTL(cacheData, reqOptions.cacheTTL);

        if (!cacheValid) { // данные есть, но TTL вышел, быстро отдаем сохраненные данные и фоном запрашиваем новые
            request(reqUrl).then(r => updateCache(url, r));
        }

        return cacheData.payload;
    }

    return await request(reqUrl);
}

export {
    getData
}