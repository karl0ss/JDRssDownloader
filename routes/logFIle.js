const lineReader = require("line-reader");
const Promise = require("bluebird");

module.exports = function (app) {
    app.get("/logFile", (req, res) => {
        logFile = []
        const eachLine = Promise.promisify(lineReader.eachLine);
        eachLine('jdrssdownloader.log', function (line) {
            logFile.push(line)
        }).then(() => {
            logFile = logFile.slice((logFile.length - 30), logFile.length)
            res.render("logFile", { title: "App Logs", logFile: logFile.reverse() });
        });
    });
}