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

module.exports = {
    nextRssRefresh, nextLinkCheck
}

