// Import dependencies
const fs = require("fs");
const Parser = require("rss-parser");
const { filterFeed } = require("./feed");
const lodash = require('lodash');
const log = require('simple-node-logger').createSimpleLogger('jdrssdownloader.log');

    (async function main() {


        // Make a new RSS Parser
        const parser = new Parser();

        // Get all the items in the RSS feed
        const feed = await parser.parseURL(JSON.parse(fs.readFileSync('config.json')).RSSFeed);

        let items = [];

        // Clean up the string and replace reserved characters
        const fileName = `${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

        if (fs.existsSync(fileName)) {
            items = require(`./${fileName}`);
        }
        let updatedArray = lodash.unionBy(feed.items, items, 'title');
        
        // Save the file
        log.info(updatedArray.length + ' items in file cache')
        fs.writeFileSync(fileName, JSON.stringify(updatedArray));

        // run next part
        filterFeed(fileName)
    })();
