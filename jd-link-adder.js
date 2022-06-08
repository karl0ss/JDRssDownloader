const { JDownloaderClient } = require('jdownloader-client')
const fs = require("fs");


async function linkAdder(links) {
    const client = new JDownloaderClient(process.env.JDUSERNAME, process.env.JDPASSWORD)
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