const express = require("express");
const searchService = require("../services/searchService");
const subjectService = require("../services/subjectService");
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
    // console.log(err.sqlMessage);
    res.json({
        "error":"true",
        "message":err.sqlMessage,
        // "data": data
    });
   });

   
});
route.post("/getsessionnamebycoursename", (req, res) => {
    // console.log(req.body);
    searchService.getSessioNameByCourseCode(req.body.coursecode,req.body.envno,req.body.sem).then((data) => {
        if(data.length > 0)
        {

            res.json({
                 "error":"false",
                 "message":"success",
                 "data": data
            });
        }
        else
        {
            res.json({
                "error":"true",
                "message":"session not found ",
                // "data": data
           });
        }
        // console.log(data);
    }).catch((err)=>{
        if(err.error==1146)
        {
            res.json({
                "error":"true",
                "message":err.sqlMessage,
                // "data": data
           });
        }
        else
        {

        res.json({
            "error":"true",
            "message":"error",
            // "data": data
       });
    }

    });
//    searchService.search(req.body).then((data) => {
//     // console.log(data);
//     res.json({
//         "error":"false",
//         "message":"success",
//         "data": data
//     });
//    }).catch((err) =>{
//     // console.log(err);
//     res.json({
//         "error":"true",
//         "message":err,
//         // "data": data
//     });
//    });

   
});
route.post("/getstudydetailbycode", (req, res) => {
    console.log(req.body);
    searchService.searchStudyCenterDetailByCode(req.body.code,req.body.session).then((data) => {
       res.json({
            "error":"false",
            "message":"success",
            "data": data
       });
    }).catch((err)=>{
        res.json({
            "error":"true",
            "message":"error",
            // "data": data
       });
    });
//    searchService.search(req.body).then((data) => {
//     // console.log(data);
//     res.json({
//         "error":"false",
//         "message":"success",
//         "data": data
//     });
//    }).catch((err) =>{
//     // console.log(err);
//     res.json({
//         "error":"true",
//         "message":err,
//         // "data": data
//     });
//    });

   
});
route.post('/getsubjectsdetailbycodelist', (req, res) =>{
    console.log(req.body);
    subjectService.getSubjectByCodeList(req.body.codelist).then(data => {
        res.json({
            "error":"false",
            "message":"success",
            "data": data
       });
    }).catch((err) =>{
        res.json({
            "error":"true",
            "message":"error",
            // "data": data
       });
    });
});
route.post('/getconsolidateresult',(req, res) =>{
    searchService.searchConsolidateResult(req.body).then(data=>{
        res.json({
            "error":"false",
            "message":"success",
            "data": data
       });
    }).catch((err) =>{
        res.json({
            "error":"true",
            "message":"error",
            // "data": data
       });
    });
});
module.exports = route;