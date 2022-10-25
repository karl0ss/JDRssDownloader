const fs = require("fs");
const { nextLinkCheck, nextRssRefresh } = require('.././utils')

module.exports = function (app) {

    app.get("/", (req, res) => {
        showListLength = JSON.parse(fs.readFileSync('config.json')).Shows.length
        a =
            res.render("index", { title: "Home", showListLength: showListLength, version: global.version, rssTime: nextRssRefresh(), linkCheck: nextLinkCheck() });
    });
}