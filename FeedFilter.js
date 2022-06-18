const fs = require('fs')
const { linkAdder } = require('./JDLinkAdder');
const { getLinksFromURL } = require('./LinkGrabber')
const { checkFileName } = require('./checkFileName')

async function filterFeed() {
    let myshowlist = JSON.parse(fs.readFileSync('config.json')).Shows
    let hevcSwitch = JSON.parse(fs.readFileSync('config.json')).OnlyHEVC
    let feed = JSON.parse(fs.readFileSync('./feedCache.json'));
    let retry_show_cache = []
    let urls_to_check = []


    for (let show of myshowlist) {

        try {
            // Find show on feed
            let list_filtered_for_show = feed.filter(item => item.title.includes(show.Name))
            if (list_filtered_for_show.length > 0) {
                for (let match of list_filtered_for_show) {
                    // If show is found get url then return all links on that page
                    let full_link_list_from_page = await getLinksFromURL(match.link)
                    if (hevcSwitch) {
                        // Only get urls with HEVC in name
                        urls_to_check = full_link_list_from_page.filter(item => item.includes('HEVC'))
                        if (urls_to_check.length == 0) {
                            // If no urls with HEVC check for H265
                            urls_to_check = full_link_list_from_page.filter(item => item.includes('H265'))
                        }
                    } else {
                        urls_to_check = full_link_list_from_page
                    }
                    // Only keep urls that match show quality
                    let urls_with_quality_in_url = urls_to_check.filter(item => item.includes(show.Quality))
                    // Remove any url trying to direct to a torrent site search
                    let urls_without_torrent_in_url = urls_with_quality_in_url.filter(item => !item.includes('torrent'))
                    // Remove any url that doesn't include MeGusta
                    if (hevcSwitch) {
                        pre_nitroFlare = urls_without_torrent_in_url.filter(item => item.includes('MeGusta'))
                    } else {
                        pre_nitroFlare = urls_without_torrent_in_url
                    }
                    // NitroFlare doesn't group with the rest of the links in JD, remove them.
                    let remove_nitroflare = pre_nitroFlare.filter(item => !item.includes('nitro'))
                    // Do some stuff
                    urlObj = checkFileName(remove_nitroflare)
                    let download_list = urlObj.urlList
                    // Send Links to JDdownloader
                    if (download_list.length !== 0) {
                        log.info(download_list.length + ' links for ' + urlObj.fileName + ' have been sent to JDdownloader')
                        linkAdder(download_list)
                    } else {
                        // No HEVC links found
                        log.info(download_list.length + ' links for ' + show.Name + ' have been found, will recheck next time.')
                        for (let feed_item of list_filtered_for_show) {
                            retry_show_cache.push(feed_item)
                        }
                    }
                }
            } else {
                // Show not found on the current feed cache
                log.info(show.Name + ' not on feed')
            }
        } catch (error) {
            log.error('Something went wrong ' + error)
        }
    }
    log.info('Wiping feed cache')
    fs.writeFileSync('./feedCache.json', JSON.stringify(retry_show_cache));
}

module.exports = {
    filterFeed
}

