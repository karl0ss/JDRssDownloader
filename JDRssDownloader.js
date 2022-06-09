const fs = require("fs");
const { feedUpdater } = require('./FeedUpdater')
const { filterFeed } = require('./FeedFilter')
const log = require('simple-node-logger').createSimpleLogger('jdrssdownloader.log');

let RSSFeedRefreshMins = JSON.parse(fs.readFileSync('config.json')).RSSFeedRefreshMins
let JDPostLinksMins = JSON.parse(fs.readFileSync('config.json')).JDPostLinksMins

log.info('Refreshing RSS Items every ' + RSSFeedRefreshMins + ' Minutes')
log.info('Checking for links and sending to JDdownloader every ' + JDPostLinksMins + ' Minutes')


setInterval(feedUpdater, RSSFeedRefreshMins * 60000);
setInterval(filterFeed, JDPostLinksMins * 60000);
