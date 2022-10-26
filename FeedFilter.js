const fs = require('fs')
const { linkAdder } = require('./JDLinkAdder');
const { getLinksFromURL } = require('./LinkGrabber')
const { checkFileName } = require('./checkFileName')
const { checkDownloadHistory } = require('./checkDownloadHistory')

async function filterFeed() {
    let hevcSwitch = JSON.parse(fs.readFileSync('config.json')).OnlyHEVC
    let myshowlist = JSON.parse(fs.readFileSync('shows.json'))
    let feed = JSON.parse(fs.readFileSync('./cache/feedCache.json'));
    let retryShowCache = []
    let urlsToCheck = []


    for (let show of myshowlist) {

        try {
            // Find show on feed
            let listFilteredForShow = feed.filter(item => item.title.includes(show.Name))
            if (listFilteredForShow.length > 0) {
                for (let match of listFilteredForShow) {
                    // If show is found get url then return all links on that page
                    let fullLinkListFromPage = await getLinksFromURL(match.link)
                    if (hevcSwitch) {
                        // Only get urls with HEVC in name
                        urlsToCheck = fullLinkListFromPage.filter(item => item.includes('HEVC'))
                        if (urlsToCheck.length == 0) {
                            // If no urls with HEVC check for H265
                            urlsToCheck = fullLinkListFromPage.filter(item => item.includes('H265'))
                        }
                    } else {
                        urlsToCheck = fullLinkListFromPage
                    }
                    // Only keep urls that match show quality
                    let urlsWithQualityInUrl = urlsToCheck.filter(item => item.includes(show.Quality))
                    // Remove any url trying to direct to a torrent site search
                    let urlsWithoutTorrentInUrl = urlsWithQualityInUrl.filter(item => !item.includes('torrent'))
                    // Remove any url that doesn't include MeGusta
                    if (hevcSwitch) {
                        preNitroflare = urlsWithoutTorrentInUrl.filter(item => item.includes('MeGusta'))
                    } else {
                        preNitroflare = urlsWithoutTorrentInUrl
                    }
                    // NitroFlare doesn't group with the rest of the links in JD, remove them.
                    let removeNitroflare = preNitroflare.filter(item => !item.includes('nitro'))
                    // Do some stuff
                    urlObj = checkFileName(removeNitroflare)
                    let downloadList = urlObj.urlList
                    // Send Links to JDdownloader
                    if (downloadList.length !== 0) {
                        if (checkDownloadHistory(urlObj)) {
                            log.info(urlObj.fileName + ' already downloaded, skipped.')
                            break
                        } else {
                            log.tele(downloadList.length + ' links for ' + urlObj.fileName + ' have been sent to JDdownloader.')
                            linkAdder(downloadList)
                            global.linkCheckTime = new Date();
                        }
                    } else {
                        // No HEVC links found
                        log.info(downloadList.length + ' links for ' + show.Name + ' have been found, will recheck next time.')
                        for (let feedItem of listFilteredForShow) {
                            retryShowCache.push(feedItem)
                        }
                        global.linkCheckTime = new Date();
                    }
                }
            } else {
                // Show not found on the current feed cache
                log.info(show.Name + ' not on feed')
            }
        } catch (error) {
            log.error('Something went wrong ' + error)
            global.linkCheckTime = new Date();
        }
    }
    log.info('Wiping feed cache')
    fs.writeFileSync('./cache/feedCache.json', JSON.stringify(retryShowCache));
    global.linkCheckTime = new Date();
}

module.exports = {
    filterFeed
}

