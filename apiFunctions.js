const fs = require('fs');
const { config } = require('process');

async function addNewShow(showData) {
    let config = JSON.parse(fs.readFileSync('config.json'))
    let exist = false
    for (let show of config.Shows) {
        if (show.Name == showData.showName) {
            exist = true
        }
    }
    if (exist) {
        log.error(showData.showName + ' Already exists in list and not added')
    } else {
        config.Shows.push({
            "Name": showData.showName,
            "Quality": showData.quality
        })
        try {
            fs.writeFileSync('config.json', JSON.stringify(config));
            log.info(showData.showName + ' Added to the list, checking for ' + showData.quality + 'p')
        } catch (err) {
            console.error(err);
        }
    }
}

async function removeShow(showData) {
    let config = JSON.parse(fs.readFileSync('config.json'))

    myArray = config.Shows.filter(function (obj) {
        return obj.Name !== showData.showName;
    });

    config.Shows = myArray
    try {
        fs.writeFileSync('config.json', JSON.stringify(config));
        log.info(showData.showName + ' Removed from tracking list.')
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    addNewShow, removeShow
}

