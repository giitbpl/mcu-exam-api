const express = require("express");
const route = express.Router();
const fs = require('fs');
const path = require('path');
const reader = require('xlsx')
// const conn=require("../db/connection");
// const hash =require("../utilites/Hashing");
const crypto = require('crypto');
const importService = require("../services/import");
// const adminservice=require("../services/AdminService");
// const classTransformer = require('class-transformer');
// const  UserModel  = require("../models/UserModel");
require('dotenv').config();
route.get('/getexportdir', (req, res) => {
    // console.log(process.env.BACKUP_DIR);
    res.status(200).json({
        "error": "text/plain",
        "data": process.env.BACKUP_DIR,
        "message": "success"

    });

})
route.post('/upload', function (req, res) {
    console.log(req.files); // the uploaded file object
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            "error": "true",
            "message": "no file selected for upload"
        });
    }
    sampleFile = req.files.file;
    uploadPath = process.env.BACKUP_DIR + '/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            res.json({
                "error": "true",
                "message": "file not uploaded",

            });
        }
        else {

            res.json({
                "error": "false",
                "message": "file uploaded successfully",

            });
        }
    });
});
route.get('/fileslist', (req, res) => {
    const dir = process.env.BACKUP_DIR;
    let fileslist = [];
    // Read all files in the directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log('Error reading files:', err);
            res.json({
                "error": "true",
                "message": err
            });
            // return;
        }
        else {


            // Loop over the files
            for (const file of files) {
                // console.log(path.extname(file));
                if (path.extname(file) == ".xlsx")
                    fileslist.push(file);
            }
            res.json({
                "error": "false",
                "message": "success",
                "data": fileslist
            });
        }
    });
});
route.post('/getsheet', (req, res) => {
    console.log(req.body.fname);
    const file = reader.readFile(process.env.BACKUP_DIR + "/" + req.body.fname);
    if (file != undefined) {

        let data = []

        const sheets = file.SheetNames
        console.log(sheets);

        res.json({
            "error": "false",
            "message": "success",
            "data": sheets
        });
    }
});
route.post("/sheetrows", (req, res) => {
    let filename = req.body.fname;
    let sheetname = req.body.sheetname;
    const file = reader.readFile(process.env.BACKUP_DIR + "/" + req.body.fname);
    const temp = reader.utils.sheet_to_json(file.Sheets[sheetname]);
    res.json({
        "error": "false",
        "message": "success",
        "data": temp.length
    })
    // console.log(temp.length);
});
route.post("/import", async (req, res) => {
    let sheetname = req.body.sheetname;
    let filename = req.body.filename;
    let recordno = req.body.recordno;
    // importService.verifyData
     importService.import(filename, sheetname, recordno).then((response) => {
        //  console.log("respnse=",response);
         res.json(response);

     }).catch((err)=>{
            //  console.log("error=",err);
             res.json(err);

     });
    // .then(response=>{
    //     res.json(response);
    // }).catch(err =>{
    //    res.json(err);
    // });
});
route.post('/verify',(req, res)=>{
    let sheetname = req.body.sheetname;
    let filename = req.body.filename;
    const file = reader.readFile(process.env.BACKUP_DIR + "/" + req.body.filename);
    const [columns] = reader.utils.sheet_to_json(file.Sheets[sheetname],{ header: 1 });
    console.log(columns);
    importService.verifyData(filename,sheetname,columns).then(response=>{
        res.json(response);
    }).catch((err)=>{
        res.jsonp(err);
    });
    
});
module.exports = route;