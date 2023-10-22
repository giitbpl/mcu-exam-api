const express = require('express');
const FileUpload = require('../utilites/FileUpload');
const route=express.Router();
const mysqldump = require('mysqldump');
require("dotenv").config();
const hostname=process.env.MYSQL_HOST;
const username=process.env.MYSQL_USERNAME;
const pwd=process.env.MYSQL_PASSWORD;
const db=process.env.MYSQL_DATABASE;
route.post("/upload",(req,res)=>{
    FileUpload.upload(req.files).then(response=>{
        console.log( req.files.file.name);
        const dbConfig = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
          };
          const dump = mysqldump();
          dump.pipe(fs.createWriteStream(process.env.BACKUP_DIR+"/"+req.files.filename));
          dump.on('end', () => {
            res.json({
                "error": "false",
                "message": "Database restored successfully!",
    
            });
          });
       
    }).catch(err=>{
        res.json({
            "error": "true",
            "message": err,

        });
    });
});
module.exports = route;