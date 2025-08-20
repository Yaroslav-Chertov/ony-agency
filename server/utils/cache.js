import path from 'node:path';
import { access, readFile, rm } from 'node:fs/promises';
import { saveFile } from './fs.js';
import { existsSync } from 'node:fs';

const cacheFolder = './.cache/';

const readFromCache = async (key) => {
    let cacheObject = false;
    try {
        cacheObject = JSON.parse(await readFile(path.join(cacheFolder, key, 'data.json')));

        if (!cacheObject) {
            return false;
        }
    } catch (error) {

    }

    if (!cacheObject.cache) {
        return false;
    }
    return cacheObject;
}

const checkCacheTTL = (cachedData, TTL) => {
    const currentTime = Math.floor(new Date().valueOf() / 1000);
    const diff = currentTime - cachedData.cache.updated;
    // console.log('Cache TTL, diff', TTL, diff);
    return diff < TTL;
}

const updateCache = async (url, payload) => {
    const cacheObject = {
        cache: {
            updated: Math.floor(new Date().valueOf() / 1000),
        },
        payload
    }

    await saveFile(path.resolve(cacheFolder, url), 'data.json', JSON.stringify(cacheObject, null, 4))

    return cacheObject;
}

const clearCache = async () => {
    const exists = existsSync(cacheFolder);

    if (!exists) return 'Cache already cleared';

    await rm(cacheFolder, { recursive: true })

    return 'Cache cleared';
}

export {
    readFromCache,
    checkCacheTTL,
    updateCache,
    clearCache
};