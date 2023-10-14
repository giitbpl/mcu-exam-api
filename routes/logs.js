const express = require("express");
const route = express.Router();
require("dotenv").config();
var fs = require('fs');
// var spawn = require('child_process').spawn;
// var mysqlDump = require('mysqldump');
const logservice = require("../services/logService");
const logService = require("../services/logService");
route.get("/info/all", (req, res) => {
    logService.readInfoLogs().then(response => {
        res.json(response);
    }).catch(err => {
        res.json(err);
    });


});
route.get("/all", (req, res)=>{
    logService.getAllLOgs().then(response => {
        res.json({
            "error":"false",
            "message":"success",
            "data": response
        });
    }).catch(err => {
        res.json({
            "error":"true",
            "message":"error",
            // "data": response
        });
    });
});
// route
module.exports = route;