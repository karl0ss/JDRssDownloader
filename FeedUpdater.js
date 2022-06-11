const fs = require("fs");
const Parser = require("rss-parser");
const lodash = require('lodash');

async function feedUpdater() {
    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL(JSON.parse(fs.readFileSync('config.json')).RSSFeed);

    let items = [];

    if (fs.existsSync('./feedCache.json')) {
        items = JSON.parse(fs.readFileSync('./feedCache.json'))
    }
    // Compare existing cache and new items and merge differences
    let updatedArray = lodash.unionBy(feed.items, items, 'title');

    // Save the file
    log.info(updatedArray.length + ' items in file cache')
    fs.writeFileSync('./feedCache.json', JSON.stringify(updatedArray));


}

module.exports = {
    feedUpdater
}