const fs = require("fs");
const { nextLinkCheck, nextRssRefresh, get_last_downloaded } = require('.././utils')


module.exports = function (app) {
    app.get("/api/stats", (req, res) => {
        retryCache = JSON.parse(fs.readFileSync('./cache/retryCache.json'))
        for (let index = 0; index < retryCache.length; index++) {
            const item = retryCache[index];
            retryCache[index].newtitle = item.title.replace(/ /g, "‡");
        }
        showList = JSON.parse(fs.readFileSync('shows.json'));
        feedCache = JSON.parse(fs.readFileSync('./cache/feedCache.json'));
        rssTime = nextRssRefresh()
        linkCheck = nextLinkCheck()
        lastDownloaded = get_last_downloaded()

        res.json({
            "ShowList": showList.length,
            "FeedCache": feedCache.length,
            "RetryCache": retryCache.length,
            "RSSCheck": rssTime,
            "LinkChecker": linkCheck,
            "LastDownloaded": lastDownloaded
        });
    });

}
