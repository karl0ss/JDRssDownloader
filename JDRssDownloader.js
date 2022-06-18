const fs = require("fs");
const { feedUpdater } = require('./FeedUpdater')
const { filterFeed } = require('./FeedFilter')
const version = require('./package.json').version;

global.log = require('simple-node-logger').createSimpleLogger({
    logFilePath: 'jdrssdownloader.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

async function main() {
    let RSSFeedRefreshMins = JSON.parse(fs.readFileSync('config.json')).RSSFeedRefreshMins
    let JDPostLinksMins = JSON.parse(fs.readFileSync('config.json')).JDPostLinksMins

    log.info('Running JDRssDownloader version ' + version)
    log.info('Refreshing RSS Items every ' + RSSFeedRefreshMins + ' Minutes')
    log.info('Checking for links and sending to JDdownloader every ' + JDPostLinksMins + ' Minutes')


    setInterval(await feedUpdater, RSSFeedRefreshMins * 60000);
    setInterval(await filterFeed, JDPostLinksMins * 60000);
}

main()