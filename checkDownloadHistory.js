const fs = require('fs')

function checkDownloadHistory(urlObj) {
    try {
        history = JSON.parse(fs.readFileSync('./cache/downloadHistory.json'));
    } catch (error) {
        fs.writeFileSync('./cache/downloadHistory.json', JSON.stringify([]));
    }
    history = JSON.parse(fs.readFileSync('./cache/downloadHistory.json'));
    if (history.includes(urlObj.fileName)) {
        return true
    } else {
        history.push(urlObj.fileName)
        fs.writeFileSync('./cache/downloadHistory.json', JSON.stringify(history));
        return false
    }
}

module.exports = { checkDownloadHistory }