const fs = require('fs');


async function addNewShow(showData) {
    let shows = JSON.parse(fs.readFileSync('shows.json'))
    let exist = false
    for (let show of shows) {
        if (show.Name == showData.showName) {
            exist = true
        }
    }
    if (exist) {
        log.error(showData.showName + ' Already exists in list and not added')
    } else {
        shows.push({
            "Name": showData.showName,
            "Quality": showData.quality
        })
        try {
            fs.writeFileSync('shows.json', JSON.stringify(shows));
            log.info(showData.showName + ' Added to the list, checking for ' + showData.quality + 'p')
        } catch (err) {
            console.error(err);
        }
    }
}

async function removeShow(showData) {
    let shows = JSON.parse(fs.readFileSync('shows.json'))

    myArray = shows.filter(function (obj) {
        return obj.Name !== showData.showName;
    });

    shows = myArray
    try {
        fs.writeFileSync('shows.json', JSON.stringify(shows));
        log.info(showData.showName + ' Removed from tracking list.')
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    addNewShow, removeShow
}

