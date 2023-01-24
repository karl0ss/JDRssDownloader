const fs = require("fs");
const {removeShowFromCache} = require('../apiFunctions')

module.exports = function (app) {
    app.get("/feedCache", (req, res) => {
        feedCache = JSON.parse(fs.readFileSync('./cache/feedCache.json'))
        res.render("feedCache", { title: "Feed Cache", feedCache: feedCache });
    });

    app.get("/retryCache", (req, res) => {
        retryCache = JSON.parse(fs.readFileSync('./cache/retryCache.json'))
        for (let index = 0; index < retryCache.length; index++) {
            const item = retryCache[index];
            retryCache[index].newtitle = item.title.replace(/ /g, "‡");
        }
        res.render("retryCache", { title: "Retry Cache", retryCache: retryCache });
    });

    app.get('/retryCache/remove', (req, res) => {
        const showName = req.query.name.replaceAll("‡", " ");
        console.log(req)
        removeShowFromCache(showName)
        res.redirect("/retryCache");
    });
}
