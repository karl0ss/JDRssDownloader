const fs = require("fs");
const { feedUpdater } = require('./FeedUpdater')
const { filterFeed } = require('./FeedFilter')
const { telegrambot } = require('./telegramCommunication')
const version = require('./package.json').version;

global.TelegramBotConfig = JSON.parse(fs.readFileSync('config.json')).TelegramBot

global.log = require('simple-node-logger').createSimpleLogger({
    logFilePath: 'jdrssdownloader.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

async function main() {
    log.info('Running JDRssDownloader version ' + version)

    if (TelegramBotConfig) {
        telegrambot('Running JDRssDownloader version ' + version)
    }
    try {
        RSSFeedRefreshMins = JSON.parse(fs.readFileSync('config.json')).RSSFeedRefreshMins
        JDPostLinksMins = JSON.parse(fs.readFileSync('config.json')).JDPostLinksMins
    } catch (error) {
        log.error('config.json file is missing.')
    }
    log.info('Refreshing RSS Items every ' + RSSFeedRefreshMins + ' Minutes')
    if (TelegramBotConfig) {
        telegrambot('Refreshing RSS Items every ' + RSSFeedRefreshMins + ' Minutes')
    }
    log.info('Checking for links and sending to JDdownloader every ' + JDPostLinksMins + ' Minutes')
    if (TelegramBotConfig) {
        telegrambot('Checking for links and sending to JDdownloader every ' + JDPostLinksMins + ' Minutes')
    }

    setInterval(await feedUpdater, RSSFeedRefreshMins * 60000);
    setInterval(await filterFeed, JDPostLinksMins * 60000);
}

main()