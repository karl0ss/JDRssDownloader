const axios = require('axios');
var cheerio = require('cheerio');

async function flareSolverr(url) {
    var data = JSON.stringify({
        "cmd": "request.get",
        "url": url,
        "maxTimeout": 120000
    });
    var config = {
        method: 'post',
        url: 'http://127.0.01:8191/v1',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    res = await axios(config)
    return res.data.solution.response
}

async function getLinksFromURL(url) {

    try {
        let links = [];
        let scrape = await flareSolverr(url)
        // let httpResponse = await axios.get(url);

        let $ = cheerio.load(scrape);
        let linkObjects = $('a'); // get all hyperlinks

        linkObjects.each((index, element) => {
            links.push(
                $(element).attr('href'), // get the href attribute
            );
        });

        return links;
    } catch (e) { console.log(e) }

}

module.exports = {
    getLinksFromURL
}