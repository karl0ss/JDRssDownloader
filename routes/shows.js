const fs = require("fs");
const { addNewShow, removeShow } = require('.././apiFunctions')

module.exports = function (app) {
    app.get("/shows", (req, res) => {
        showList = JSON.parse(fs.readFileSync('config.json')).Shows
        res.render("shows", { title: "Show List", showList: showList });
    });

    app.get("/shows/add", (req, res) => {
        res.render("addshow", { title: "Add Show" });
    });

    app.get("/shows/remove", (req, res) => {
        showList = JSON.parse(fs.readFileSync('config.json')).Shows
        res.render("removeshow", { title: "Remove Show", showList: showList });
    });

    app.post('/addNewShow', (req, res) => {
        addNewShow(req.body)
        res.redirect("/shows");
    });

    app.post('/removeShow', (req, res) => {
        removeShow(req.body)
        res.redirect("/shows");
    });
}
