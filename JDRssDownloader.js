const fs = require("fs");
config = JSON.parse(fs.readFileSync('config.json'))
const { feedUpdater } = require('./FeedUpdater')
const { filterFeed } = require('./FeedFilter')
const { telegrambot } = require('./telegramCommunication')
const { create_empty_cache_files } = require('./utils')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const basicAuth = require('express-basic-auth')
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./routes')(app);
app.use(basicAuth({
    users: { 'admin': config.AdminPassword },
    challenge: true,
}))

global.rssRefreshTime = new Date();
global.linkCheckTime = new Date();
global.version = require('./package.json').version;

global.log = require('simple-node-logger').createSimpleLogger({
    logFilePath: 'jdrssdownloader.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

log.tele = function () {
    var args = Array.prototype.slice.call(arguments),
        entry = log.log('info', args);
    process.nextTick(function () {
        if (config.TelegramBot) {
            telegrambot(entry.msg[0])
        }
    });
};

async function main() {
    log.tele('Running JDRssDownloader version ' + global.version)
    try {
        RSSFeedRefreshMins = config.RSSFeedRefreshMins
        JDPostLinksMins = config.JDPostLinksMins
    } catch (error) {
        log.error('config.json file is missing.')
    }
    log.tele('Refreshing RSS Items every ' + RSSFeedRefreshMins + ' Minutes')
    log.tele('Checking for links and sending to JDdownloader every ' + JDPostLinksMins + ' Minutes')
    app.listen(config.WebUIPort, () => log.info(`WebUi is listening on ${config.WebUIPort}!`))
    create_empty_cache_files()
    setInterval(await feedUpdater, RSSFeedRefreshMins * 60000);
    setInterval(await filterFeed, JDPostLinksMins * 60000);
}

main()