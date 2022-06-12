function checkFileName(urls) {
    let urlList = []
    urls.forEach(url => {
        let cut = url.match(/([^\/]*$)/mg);
        if (cut[0] !== '') {
            urlList.push(url)
        }
    });
    return urlList
}

module.exports = { checkFileName }