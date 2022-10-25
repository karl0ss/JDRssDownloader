const fs = require('fs');
config = JSON.parse(fs.readFileSync('config.json'))
var moment = require('moment');


function next_rss_refresh() {
    var date1 = moment(global.rss_refresh_time);
    date1.add(config.RSSFeedRefreshMins, 'm');
    return new moment(date1).format("ddd, LTS")
}

function next_link_check() {
    var date1 = moment(global.link_check_time);
    date1.add(config.JDPostLinksMins, 'm');
    return new moment(date1).format("ddd, LTS")
}

module.exports = {
    next_rss_refresh, next_link_check
}

