const extractUrls = require("extract-urls");
const fs = require('fs')
const { linkAdder } = require('./jd-link-adder');
const log = require('simple-node-logger').createSimpleLogger('jdrssdownloader.log');

function filterFeed(fileName) {
    let myshowlist = JSON.parse(fs.readFileSync('config.json')).Shows
    let feed = JSON.parse(fs.readFileSync(fileName));

    myshowlist.forEach(show => {
        try {
            let list_filtered_for_show = feed.filter(item => item.title.includes(show))
            let extracted_urls_for_show = extractUrls(list_filtered_for_show[0]["content:encoded"]);
            let urls_with_HEVC_in_url = extracted_urls_for_show.filter(item => item.includes('HEVC'))
            let urls_with_quality_in_url = urls_with_HEVC_in_url.filter(item => item.includes(JSON.parse(fs.readFileSync('config.json')).Quality))
            let urls_without_torrent_in_url = urls_with_quality_in_url.filter(item => !item.includes('torrent'))
            log.info(show + ' - ' + urls_without_torrent_in_url)
            linkAdder(urls_without_torrent_in_url)
        } catch (error) {
            log.info(show + ' not on feed')
        }

    })
}

module.exports = {
    filterFeed
}

