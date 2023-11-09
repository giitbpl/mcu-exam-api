const express = require("express");
const courseService = require("../services/courseService");
const collegeService = require("../services/collegeService");

const route = express.Router();
require("dotenv").config();
// var fs = require('fs');
// var spawn = require('child_process').spawn;
// var mysqlDump = require('mysqldump');

route.get("/all", (req, res) => {
    console.log("GET ALL courses");
    // console.log(req.body);
   courseService.getAll().then((data) => {
    console.log(data);
    res.json({
        "error":"false",
        "message":"success",
        "data": data
    });
   }).catch((err) =>{
    // console.log(err);
    res.json({
        "error":"true",
        "message":err,
        // "data": data
    });
   });

   
});
route.post('/insert', (req, res)=>{
    console.log(req.body);
    // collegeService.import()
});
module.exports = route;