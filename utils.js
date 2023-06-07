const fs = require('fs');
config = JSON.parse(fs.readFileSync('config.json'))
var moment = require('moment');

function returnUpdatedDate(date, offset) {
    var newDate = moment(date);
    newDate.add(offset, 'm');
    return new moment(newDate).format("ddd, LTS")
}

function nextRssRefresh() {
    return returnUpdatedDate(global.rssRefreshTime, config.RSSFeedRefreshMins)
}

function nextLinkCheck() {
    return returnUpdatedDate(global.linkCheckTime, config.JDPostLinksMins)
}

function get_last_downloaded() {
    history = JSON.parse(fs.readFileSync('./cache/downloadHistory.json'))
    last = history.slice(-1)[0]
    return last
}

function create_empty_downloadHistory() {
    try {
        return JSON.parse(fs.readFileSync('./cache/downloadHistory.json'));
    } catch (error) {
        fs.writeFileSync('./cache/downloadHistory.json', JSON.stringify([]));
        return JSON.parse(fs.readFileSync('./cache/downloadHistory.json'));
    }
}

function create_empty_retry_cache() {
    try {
        return JSON.parse(fs.readFileSync('./cache/retryCache.json'));
    } catch (error) {
        fs.writeFileSync('./cache/retryCache.json', JSON.stringify([]));
        return JSON.parse(fs.readFileSync('./cache/retryCache.json'));
    }
}

function create_empty_shows_file() {
    try {
        return JSON.parse(fs.readFileSync('./shows.json'));
    } catch (error) {
        fs.writeFileSync('./shows.json', JSON.stringify([]));
        return JSON.parse(fs.readFileSync('./shows.json'));
    }
}

function create_empty_cache_files() {
    create_empty_downloadHistory()
    create_empty_retry_cache()
    create_empty_shows_file() 
}

module.exports = {
    nextRssRefresh, nextLinkCheck, get_last_downloaded, create_empty_cache_files
}

