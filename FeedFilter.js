const fs = require('fs')
const { linkAdder } = require('./JDLinkAdder');
const { getLinksFromURL } = require('./LinkGrabber')
const { checkFileName } = require('./checkFileName')

async function filterFeed() {
    let myshowlist = JSON.parse(fs.readFileSync('config.json')).Shows
    let hevcSwitch = JSON.parse(fs.readFileSync('config.json')).OnlyHEVC
    let feed = JSON.parse(fs.readFileSync('./feedCache.json'));


    if (hevcSwitch) {
        myshowlist.forEach(async show => {
            try {
                // Find show on feed
                let list_filtered_for_show = feed.filter(item => item.title.includes(show.Name))
                if (list_filtered_for_show.length > 0) {
                    // If show is found get url then return all links on that page
                    let full_link_list_from_page = await getLinksFromURL(list_filtered_for_show[0].link)
                    // Only get urls with HEVC in name
                    let urls_with_HEVC_in_url = full_link_list_from_page.filter(item => item.includes('HEVC'))
                    if (urls_with_HEVC_in_url.length == 0) {
                        // If no urls with HEVC check for H265
                        urls_with_HEVC_in_url = full_link_list_from_page.filter(item => item.includes('H265'))
                    }
                    // Only keep urls that match show quality
                    let urls_with_quality_in_url = urls_with_HEVC_in_url.filter(item => item.includes(show.Quality))
                    // Remove any url trying to direct to a torrent site search
                    let urls_without_torrent_in_url = urls_with_quality_in_url.filter(item => !item.includes('torrent'))
                    // Remove any url that doesn't include MeGusta
                    let only_MeGusta_links = urls_without_torrent_in_url.filter(item => item.includes('MeGusta'))
                    // NitroFlare doesn't group with the rest of the links in JD, remove them.
                    let remove_nitroflare = only_MeGusta_links.filter(item => !item.includes('nitro'))
                    // Do some stuff
                    let download_list = checkFileName(remove_nitroflare)
                    // Send Links to JDdownloader
                    if (download_list.length !== 0) {
                        log.info(download_list.length + ' links for ' + show.Name + ' have been sent to JDdownloader')
                        linkAdder(download_list)
                    } else {
                        // No HEVC links found
                        log.info(download_list.length + ' HEVC links for ' + show.Name + ' have been found')
                    }

                } else {
                    // Show not found on the current feed cache
                    log.info(show.Name + ' not on feed')
                }
            } catch (error) {
                log.error('Something went wrong ' + error)
            }

        })
    } else {
        myshowlist.forEach(async show => {
            try {
                // Find show on feed
                let list_filtered_for_show = feed.filter(item => item.title.includes(show.Name))
                if (list_filtered_for_show.length > 0) {
                    // If show is found get url then return all links on that page
                    let full_link_list_from_page = await getLinksFromURL(list_filtered_for_show[0].link)
                    // Only keep urls that match show quality
                    let urls_with_quality_in_url = full_link_list_from_page.filter(item => item.includes(show.Quality))
                    // Remove any url trying to direct to a torrent site search
                    let urls_without_torrent_in_url = urls_with_quality_in_url.filter(item => !item.includes('torrent'))
                    // NitroFlare doesn't group with the rest of the links in JD, remove them.
                    let remove_nitroflare = urls_without_torrent_in_url.filter(item => !item.includes('nitro'))
                    // Do some stuff
                    let download_list = checkFileName(remove_nitroflare)
                    // Send Links to JDdownloader
                    if (download_list.length !== 0) {
                        log.info(download_list.length + ' links for ' + show.Name + ' have been sent to JDdownloader')
                        linkAdder(download_list)
                    } else {
                        // No links found
                        log.info(download_list.length + ' links for ' + show.Name + ' have been found')
                    }

                } else {
                    // Show not found on the current feed cache
                    log.info(show.Name + ' not on feed')
                }
            } catch (error) {
                log.error('Something went wrong ' + error)
            }

        })
    }

    //
    log.info('Wiping feed cache')
    fs.writeFileSync('./feedCache.json', JSON.stringify('[]'));
}

module.exports = {
    filterFeed
}

