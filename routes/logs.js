const express = require("express");
const route = express.Router();
const userActivityLogService = require("../services/UserActivityLogService");
require("dotenv").config();
var fs = require('fs');
// var spawn = require('child_process').spawn;
// var mysqlDump = require('mysqldump');
const logservice = require("../services/logService");
const JwtToken = require('../services/JwtToken');

// const logService = require("../services/logService");
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
route.post("/del",(req,res) => {
    console.log(req.body.duration);
    logservice.deleteLogByduration(req.body.duration).then(data=>{
            res.json({
                "error":"false",
                "message":"success",
                "data":data.affectedRows
            });
    }).catch(err => {
        res.json({
            "error":"true",
            "message":"error",
        });
    });
});
route.get("/getuseractivity",(req,res) => {
    let reqtoken = req.headers.authorization.split(" ");
    //   console.log("request token", reqtoken);
    token = JwtToken.verify(reqtoken[1], process.env.JWT_SECRET_TOKEN);
    userActivityLogService.getUserActivityLog(token.uid).then(response=>{
        res.json({
            "error":"false",
            "message":"success",
            "data": response
        });
    }).catch(err =>{
        res.json({
            "error":"true",
            "message":"error",
        });
    }) 
});
// route
module.exports = route;