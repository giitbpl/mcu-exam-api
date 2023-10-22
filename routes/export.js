const express = require("express");
const route = express.Router();
require("dotenv").config();
var fs = require('fs');
var spawn = require('child_process').spawn;
var mysqlDump = require('mysqldump');

route.post("/backup", (req, res) => {
    var wstream = fs.createWriteStream('dumpfilename.sql');

    var mysqldump = spawn('mysqldump', [
        '-u',
        process.env.MYSQL_USERNAME,
        '-p' + process.env.MYSQL_PASSWORD,
        process.env.MYSQL_DATABASE,
        req.body.tablename
        // 'employee'
    ]);

    mysqldump
        .stdout
        .pipe(wstream)
        .on('finish', function () {
            console.log('Completed');
            res.download('dumpfilename.sql',(err) => {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    fs.unlinkSync("dumpfilename.sql");
                }
            });
        })
        .on('error', function (err) {
            res.json({
                "error": "true",
                "message": err.message
            });
        });
});
module.exports = route;