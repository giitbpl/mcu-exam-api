const express = require("express");
const route = express.Router();
const fs = require('fs');
const path = require('path');
const reader = require('xlsx')
// const conn=require("../db/connection");
// const hash =require("../utilites/Hashing");
const crypto = require('crypto');
const importService = require("../services/import");
const e = require("express");
const FileUpload = require("../utilites/FileUpload");
const collegeService = require("../services/collegeService");
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
    // console.log(req.files); // the uploaded file object
    // let sampleFile;
    // let uploadPath;
    // if (!fs.existsSync(process.env.BACKUP_DIR)){
    //     fs.mkdirSync(process.env.BACKUP_DIR);
    // }
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).json({
    //         "error": "true",
    //         "message": "no file selected for upload"
    //     });
    // }
    // sampleFile = req.files.file;
    // uploadPath = process.env.BACKUP_DIR + '/' + sampleFile.name;

    // // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv(uploadPath, function (err) {
    //     if (err) {
    //         res.json({
    //             "error": "true",
    //             "message": "file not uploaded",

    //         });
    //     }
    //     else {

    //         res.json({
    //             "error": "false",
    //             "message": "file uploaded successfully",

    //         });
    //     }
    // });
    FileUpload.upload(req.files).then(response => {
        console.log(response);
        res.json({
            "error": "false",
            "message": response,

        });
    }).catch(err => {
        console.log(err);
        res.json({
            "error": "true",
            "message": err,

        });
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
        console.log(files);
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
                if (path.extname(file) == ".xlsx" || path.extname(file) == ".xls")
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
    console.log(req.body);
    let sheetname = req.body.sheetname;
    let filename = req.body.filename;
    let recordno = req.body.recordno;
    let tablename = req.body.tablename;
    if (req.body.type == "college") {
        collegeService.import(filename, sheetname,recordno, tablename).then((response) => {
            //  console.log("respnse=",response);
            res.json(response);

        }).catch((err) => {
            //  console.log("error=",err);
            res.json(err);

        });
    }
    else {


        // importService.v
        importService.import(filename, sheetname, recordno, tablename).then((response) => {
            //  console.log("respnse=",response);
            res.json(response);

        }).catch((err) => {
            //  console.log("error=",err);
            res.json(err);

        });
    }
    // .then(response=>{
    //     res.json(response);
    // }).catch(err =>{
    //    res.json(err);
    // });
});
route.post('/verify', (req, res) => {
    // console.log(req.body);
    let tablename = ""
    if (req.body.type == 'resultdata') {
        tablename = "master_template";

    }
    else if (req.body.type == 'college') {
        tablename = "college_master";

    }
    // let sheetname = req.body.sheetname;
    // let filename = req.body.filename;
    // console.log("table name=>",tablename);
    const file = reader.readFile(process.env.BACKUP_DIR + "/" + req.body.filename);
    const [columns] = reader.utils.sheet_to_json(file.Sheets[req.body.sheetname], { header: 1 });
    // console.log("file columns=>",columns);
    importService.verifyData(columns, tablename).then(response => {
        res.json(response);
    }).catch((err) => {
        res.jsonp(err);
    });

});
route.post("/createtable", (req, res) => {
    let session_name = req.body.session;
    let year_name = req.body.year;
    importService.createTable("college_" + session_name + "_" + year_name).then(data => {
        console.log(data);
        res.json({
            "error": "false",
            "message": "database created successfully",
        });
    }).catch(err => {
        console.log(err.errno);
        if (err.errno === 1050) {
            res.json({
                "error": "true",
                "message": "database already exists"
            });
        }
        else {
            res.json({
                "error": "true",
                "message": "something went wrong"
            });
        }
    });

});
route.get("/getalltablesname", (req, res) => {
    importService.getAllTableNames().then(data => {
        let ignoredTableNames = ["user", "activity_log", "master_template", "course_master","college_master"];
        // let tables =[];

        const tables = data.filter((value) => {
            // console.log(value.Tables_in_mcuexam);
            return !ignoredTableNames.includes(value.Tables_in_mcuexam)
        });
        res.json({
            "errors": "false",
            "messages": "success",
            "data": tables
        });
        // console.log("new array=>",newArray);
        // data.forEach(element => {
        //     // console.log(element);
        //     ignoredTableNames.forEach(tableName => {
        //         if (tableName!==element)
        //         {
        //             tables.push(element);
        //         }
        //     }); 
        //     // if()
        // });
        // console.log(tables);
    }).catch((err) => {
        res.json({
            "errors": "true",
            "messages": "tables not found",
            // "data": tables
        });
    });
});
route.post('/analyzed', (req, res) => {
    // let sheetname = req.body.sheetname;
    // let filename = req.body.filename;
    let tablename = "";
    if (req.body.type == "college") {
        tablename = "college_master";
    }
    else if (req.body.type == "resultdata") {
        tablename = "master_template";

    }
    const file = reader.readFile(process.env.BACKUP_DIR + "/" + req.body.filename);
    const [columns] = reader.utils.sheet_to_json(file.Sheets[req.body.sheetname], { header: 1 });
    // console.log(columns);

    importService.getAllDBColumns(tablename).then(cols => {
        let table_column = [];
        cols.forEach(element => {
            table_column.push(element.Field);
            // console.log(element.Field);
        });
        res.json({
            "error": "false",
            message: "success",
            "data": {
                "excel_column": columns,
                "table_column": table_column,
            }
        });
    }).catch(err => {
        res.json({
            "error": "true",
            "message": err
        });
    });

    // importService.verifyData(filename, sheetname, columns).then(response => {
    //     res.json(response);
    // }).catch((err) => {
    //     res.jsonp(err);
    // });

});
module.exports = route;