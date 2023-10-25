const express = require("express");
const searchService = require("../services/searchService");
const route = express.Router();
require("dotenv").config();
// var fs = require('fs');
// var spawn = require('child_process').spawn;
// var mysqlDump = require('mysqldump');

route.post("/search", (req, res) => {
    // console.log(req.body);
   searchService.search(req.body).then((data) => {
    // console.log(data);
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
module.exports = route;