const fs = require('fs')

function retryCache(cache) {
    if (cache == null) {
        retryCacheData = JSON.parse(fs.readFileSync('./cache/retryCache.json'));
        return retryCacheData
    }
    retryCacheData = JSON.parse(fs.readFileSync('./cache/retryCache.json'));
    if (retryCacheData.some(e => e.title === cache.title)) {
        log.info(cache.title + ' is already in the retry cache.')
    }
    else {
        cache.retryCount = 5
        retryCacheData.push(cache)
        fs.writeFileSync('./cache/retryCache.json', JSON.stringify(retryCacheData));
        log.info(cache.title + ' written to retry cache.')
        return retryCacheData
    }
}

module.exports = { retryCache }