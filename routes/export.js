const express = require("express");
const route = express.Router();
require("dotenv").config();
var fs = require('fs');
var spawn = require('child_process').spawn;
var mysqlDump = require('mysqldump');

route.get("/backup", (req, res) => {
    var wstream = fs.createWriteStream('dumpfilename.sql');

    var mysqldump = spawn('mysqldump', [
        '-u',
        process.env.MYSQL_USERNAME,
        '-p' + process.env.MYSQL_PASSWORD,
        process.env.MYSQL_DATABASE,
        // 'employee'
    ]);

    mysqldump
        .stdout
        .pipe(wstream)
        .on('finish', function () {
            console.log('Completed');
            res.download('dumpfilename.sql');
        })
        .on('error', function (err) {
            res.json({
                "error": "true",
                "message": err.message
            });
        });
});
module.exports = route;