const hash = require("../utilites/Hashing");
const connection = require("../db/connection");
const { UserModel } = require("../models/UserModel");
const { use } = require("../routes/admin");
var crypto = require('crypto');
const Hashing = require("../utilites/Hashing");
const reader = require('xlsx')
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class ImportService {
    async import(filename, sheetname, recordno) {
        let pro = new Promise(async (resolve, reject) => {

            let sheetdata = await this.getSheetRows(filename, sheetname, recordno);


            // console.log("sheetdata=", sheetdata);
            if (sheetdata == 1) {
                reject({
                    "error": "true",
                    "message": "file not found"
                });
                // return;
            }
            else if (sheetdata == 2) {
                reject({
                    "error": "true",
                    "message": "sheet not found"
                });
            }
            else if (sheetdata == 3) {
                reject({
                    "error": "true",
                    "message": "out of range"
                });
            }
            else {
                // const conn= await  connection.getConnection();
                // console.log("inside connection");
                connection.getConnection((error, conn) => {
                    // console.log(error);
                    let flag = false;
                    // for (let i = 0; i < sheetdata.length; i++) {

                    // this.insetRecord(sheetdata.data[i], conn)
                    conn.query("INSERT INTO `employee`(`fname`, `lname`, `gender`, `country`, `age`, `date`,`id`) VALUES (?,?,?,?,?,?,?)",
                        [sheetdata["fname"], sheetdata["lname"], sheetdata["gender"], sheetdata["country"], sheetdata["age"], sheetdata["date"], sheetdata["id"]], (err, result) => {
                            //   console.log(err);
                            conn.release();
                            if (err != null) {
                                reject({
                                    "error": "true",
                                    "message": "duplicate error"
                                });
                                // flag = true;
                                // throw err;
                                // return;
                            }
                            else {
                                // continue;
                                resolve({
                                    "error": "false",
                                    "message": "success"
                                });
                            }

                        });

                    // }
                    // resolve({
                    //     "error": "false",
                    //     "message": "success imported"
                    // });
                    console.log("outside the =", flag);
                });
            }
            // });
            // });
        });
        return pro;
        //end


    }
    insetRecord(data, conn) {
        let flag = false;
        // let p = new Promise((resolve, reject) => {
        conn.query("INSERT INTO `employee`(`fname`, `lname`, `gender`, `country`, `age`, `date`,`id`) VALUES (?,?,?,?,?,?,?)",
            [data["fname"], data["lname"], data["gender"], data["country"], data["age"], data["date"], data["id"]], (err, result) => {
                console.log("insert error=", err);
                // console.log("insert result=", result);
                if (err != null) {
                    flag = true;
                    return false;
                    // reject({
                    //     "error": "true",
                    //     "message": "duplicate"
                    // });
                }
                else {
                    // resolve({
                    //     "error": "true",
                    //     "message": "duplicate"
                    // });
                    return true;
                }

            });
        return false;
        // });

        // return p;
        //     console.log("insert flag=",flag);
        // return flag;
    }
    getSheetRows(filename, sheetname, recordno) {
        console.log("has key=", myCache.getStats());
        if (myCache.has('sheetdata') == true) {

            const temp = myCache.get('sheetdata');

            const rows = myCache.get('length');
            if (recordno >= rows) {
                myCache.del("sheetdata");
                myCache.del('length');
                return 3;//out of range
            }
            console.log("records=", rows);
            //    if(rows)
            //    {

            //    }
            // if(rows>)
            console.log("catches rows=", temp[recordno]);
            return temp[recordno];
        }

        // let p = new Promise((resolve, reject) => {
        const file = reader.readFile(process.env.BACKUP_DIR + "/" + filename);
        if (file == undefined) {
            return 1; // file not found

        }
        else {
            const temp = reader.utils.sheet_to_json(file.Sheets[sheetname]);
            // console.log(temp.length);
            if (temp == undefined) {
                return 2; //sheet not found

            }
            else {
                if (recordno >= temp.length) {
                    return 3;//out of range
                }
                myCache.set('sheetdata', temp);
                myCache.set('length', temp.length);
                return temp[recordno];
            }
        }


    }
    // * verify the imported excel data with mysql table structure
    verifyData(filename, sheetname, columns) {
        let pro = new Promise(async (resolve, reject) => {
            connection.getConnection((err, conn) => {
                conn.query("SHOW COLUMNS FROM employee", (error, result) => {
                    console.log(result.length);
                    console.log(columns.length);
                    if (result.length == columns.length) {
                        
                        console.log(columns);
                        result.forEach(row => {
                            // console.log(col.Field)
                            columns.forEach(col => {
                                if(row.Field !=col)
                                {
                                    return false;
                                }

                            })

                        }
                        );
                        resolve({
                            "error": "false",
                            "message": "structures matching"
                        });
                    }
                    else {
                        reject({
                            "error": "true",
                            "message": "structures not matching"
                        });
                    }
                });
            });
        });
        return pro;
    }
}
module.exports = new ImportService();