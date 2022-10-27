const fs = require("fs");
const { addNewShow, removeShow, editShow } = require('.././apiFunctions')
const { check, validationResult } = require('express-validator');


module.exports = function (app) {
    app.get("/shows", (req, res) => {
        showList = JSON.parse(fs.readFileSync('shows.json'))
        res.render("shows", { title: "Show List", showList: showList });
    });

    app.get("/shows/add", (req, res) => {
        res.render("addshow", { title: "Add Show" });
    });

    app.get("/shows/remove", (req, res) => {
        showList = JSON.parse(fs.readFileSync('shows.json'))
        res.render("removeshow", { title: "Remove Show", showList: showList });
    });

    app.get("/shows/edit", (req, res) => {
        showList = JSON.parse(fs.readFileSync('shows.json'))
        res.render("editShow", { title: "Edit Show", showList: showList });
    });

    app.post('/addNewShow', [
        check('showName')
            .isLength({ min: 1 })
    ], (req, res) => {
        if (validationResult(req).isEmpty()) {
            addNewShow(req.body)
            res.redirect("/shows");
        } else {
            log.error('You cannot add a show without a name.')
            res.redirect("/shows");
        }
    }
    );

    app.post('/removeShow', (req, res) => {
        removeShow(req.body)
        res.redirect("/shows");
    });

    app.post('/editShow', (req, res) => {
        editShow(req.body)
        res.redirect("/shows");
    });
}
