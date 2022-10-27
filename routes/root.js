const fs = require("fs");
const { nextLinkCheck, nextRssRefresh, get_last_downloaded } = require('.././utils')

module.exports = function (app) {

    app.get("/", (req, res) => {
        showListLength = JSON.parse(fs.readFileSync('shows.json')).length
        rssTime = nextRssRefresh()
        linkCheck = nextLinkCheck()
        res.render("index", { title: "Home", showListLength: showListLength, version: global.version, rssTime: rssTime, linkCheck: linkCheck, lastDownloaded: get_last_downloaded() });
    });
}