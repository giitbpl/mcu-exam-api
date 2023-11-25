const express = require("express");
const courseService = require("../services/courseService");

const route = express.Router();
require("dotenv").config();
// var fs = require('fs');
// var spawn = require('child_process').spawn;
// var mysqlDump = require('mysqldump');

route.get("/all", (req, res) => {
    // console.log("GET ALL courses");
    // console.log(req.body);
    courseService.getAll().then((data) => {
        // console.log(data);
        res.json({
            "error": "false",
            "message": "success",
            "data": data
        });
    }).catch((err) => {
        // console.log(err);
        res.json({
            "error": "true",
            "message": err,
            // "data": data
        });
    });


});
route.post('/create', (req, res) => {
    courseService.createCourseTable(req.body.tablename).then((data) => {
        res.json({
            "error": "false",
            "message": "success",
            "data": data
        });
    }).catch((err) => {
        res.json({
            "error": "true",
            "message": "failed"
        });
    });
});
route.post('/coursebytype', (req, res) => {
    courseService.getCourseNameByType(req.body.type).then((data) => {
        res.json({
            "error": "false",
            "message": "success",
            "data": data
        });
    }).catch((err) => {
        res.json({
            "error": "true",
            "message": "failed"
        });
    });
});

module.exports = route;