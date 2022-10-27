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

function get_last_downloaded(){
    history = JSON.parse(fs.readFileSync('./cache/downloadHistory.json'))
    last = history.slice(-1)[0] 
    return last
}

module.exports = {
    nextRssRefresh, nextLinkCheck, get_last_downloaded
}

