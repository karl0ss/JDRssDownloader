function checkFileName(urls) {
    let urlObj = {
        "fileName": "",
        "urlList": []
    }
    urls.forEach(url => {
        let cut = url.match(/([^\/]*$)/mg);
        if (cut[0] !== '') {
            urlObj.fileName = cut[0].replace('.html', '')
            urlObj.urlList.push(url)
        }
    });
    return urlObj
}

module.exports = { checkFileName }