const fs = require("fs");
const { feedUpdater } = require('./FeedUpdater')
const { filterFeed } = require('./FeedFilter')
const { telegrambot } = require('./telegramCommunication')
const { addNewShow, removeShow } = require('./apiFunctions')
const version = require('./package.json').version;
config = JSON.parse(fs.readFileSync('config.json'))
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
pass = config.AdminPassword
app.use(basicAuth({
    users: { 'admin': pass },
    challenge: true,
}))
const port = config.WebUIPort;

global.log = require('simple-node-logger').createSimpleLogger({
    logFilePath: 'jdrssdownloader.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

log.tele = function() {
    var args = Array.prototype.slice.call( arguments ),
        entry = log.log('info', args);
    process.nextTick(function() {
        if (config.TelegramBot) {
            telegrambot(entry.msg[0])
    }
    });
};

app.get("/", (req, res) => {
    showListLength = JSON.parse(fs.readFileSync('config.json')).Shows.length
    res.render("index", { title: "Home", showListLength:showListLength, version:version });
});

app.get("/shows", (req, res) => {
    showList = JSON.parse(fs.readFileSync('config.json')).Shows
    res.render("shows", { title: "Show List", showList: showList });
});

app.get("/shows/add", (req, res) => {
    res.render("addshow", { title: "Add Show" });
});

app.get("/shows/remove", (req, res) => {
    showList = JSON.parse(fs.readFileSync('config.json')).Shows
    res.render("removeshow", { title: "Remove Show",  showList: showList });
});

app.get("/logs", (req, res) => {
    const lineReader = require("line-reader");
    const Promise = require("bluebird");
    logFile = []
    const eachLine = Promise.promisify(lineReader.eachLine);
    eachLine('jdrssdownloader.log', function (line) {
        logFile.push(line)
    }).then(() => {
        logFile = logFile.slice((logFile.length - 50), logFile.length)
     res.render("logs", { title: "App Logs",  logFile: logFile });
    });
});

app.post('/addNewShow', (req, res) => {
    addNewShow(req.body)
    res.redirect("/shows");
});

app.post('/removeShow', (req, res) => {
    removeShow(req.body)
    res.redirect("/shows");
});

async function main() {
    log.tele('Running JDRssDownloader version ' + version)
    try {
        RSSFeedRefreshMins = JSON.parse(fs.readFileSync('config.json')).RSSFeedRefreshMins
        JDPostLinksMins = JSON.parse(fs.readFileSync('config.json')).JDPostLinksMins
    } catch (error) {
        log.error('config.json file is missing.')
    }
    log.tele('Refreshing RSS Items every ' + RSSFeedRefreshMins + ' Minutes')
    log.tele('Checking for links and sending to JDdownloader every ' + JDPostLinksMins + ' Minutes')
    app.listen(port, () => log.info(`WebUi is listening on ${port}!`))
    setInterval(await feedUpdater, RSSFeedRefreshMins * 60000);
    setInterval(await filterFeed, JDPostLinksMins * 60000);
}

main()