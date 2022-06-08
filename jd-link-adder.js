const { JDownloaderClient } = require('jdownloader-client')
const fs = require("fs");


async function linkAdder(links) {

    const client = new JDownloaderClient(JSON.parse(fs.readFileSync('config.json')).JDUserName, JSON.parse(fs.readFileSync('config.json')).JDPassword)
    await client.connect()
    const devices = await client.listDevices()
    const addLinks = await client.linkGrabberAddLinks(devices[0].id, {
        links: links,
        autostart: JSON.parse(fs.readFileSync('config.json')).Autostart
    })
}

module.exports = {
    linkAdder
}    