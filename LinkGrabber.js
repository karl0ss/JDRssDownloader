const axios = require('axios');
var cheerio = require('cheerio');

async function getLinksFromURL(url) {

    try {
        let links = [];
        let httpResponse = await axios.get(url);

        let $ = cheerio.load(httpResponse.data);
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