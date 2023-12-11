const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
const reader = require('xlsx')
const connection = require("../db/connection");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class CollegeService {
    getAll() {
        // console.log(data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select *from course_master", (err, result) => {
                        console.log(err, result);
                        conn.release(); 
                        if (err) reject(err);
                        else resolve(result);
                    });

                }
            });
        });
        return p;
    }
    getCourseNameByCode(code) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select shortname from course_master where code=?", [code], (err, result) => {
                        // console.log(err, result);
                        conn.release(); 
                        resolve(result);
                        // if (err) reject(err);
                        // else resolve(result);
                    });

                }
            });
        });
        return p;
    }
    async import(filename, sheetname, recordno, tablename) {
        let pro = new Promise(async (resolve, reject) => {

            let data = await this.getSheetRows(filename, sheetname, recordno);
            // console.log(data);

            // console.log("sheetdata=", sheetdata);
            if (data == 1) {
                reject({
                    "error": "true",
                    "message": "file not found"
                });
                // return;
            }
            else if (data == 2) {
                reject({
                    "error": "true",
                    "message": "sheet not found"
                });
            }
            else if (data == 3) {
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
                //  console.log(data);
                
                let address = data["ADDRESS"];
                if(address == undefined) {
                    
                    address = "";
                }
                console.log("address=>",address);
                 //  if(data["ADDRESS"])
                    conn.query("INSERT INTO " + tablename + " (`code`, `COLLEGE / CENTER NAME`, `address`, `city`, `dist`, `state`, `pin`) VALUES (?,?,?,?,?,?,?)", [data["CODE"],data["COLLEGE / CENTER NAME"],address.substring(0,150),data["CITY"],data["DIST"],data["STATE"],data["PIN"]], (err, result) => {
                    // conn.query("INSERT INTO " + tablename + " VALUES (?,?,?,?,?,?,?,,mull,null)", [data["CODE"],data["COLLEGE / CENTER NAME"],data["ADDRESS"],data["CITY"],data["DIST"],data["STATE"],data["PIN"]], (err, result) => {
                            console.log(err);
                            console.log(result);
                            conn.release();
                            if (err != null) {
                                if (err.errno == 1054) {
                                    reject({
                                        "error": "true",
                                        "message": "database error"
                                    });
                                } else {
                                    reject({
                                        "error": "true",
                                        "message": "server error"
                                    });
                                }
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

                  
                });
            }
            // });
            // });
        });
        return pro;
        //end


    }
    getSheetRows(filename, sheetname, recordno) {
        // console.log("has key=", myCache.getStats());
        if (myCache.has('sheetdata') == true) {

            const temp = myCache.get('sheetdata');

            const rows = myCache.get('length');
            if (recordno >= rows) {
                myCache.del("sheetdata");
                myCache.del('length');
                myCache.flushStats();
                myCache.flushAll();

                return 3;//out of range
            }
            console.log("rows=", rows);
            console.log("records=", recordno);
            //    if(rows)
            //    {

            //    }
            // if(rows>)
            // console.log("catches rows=", temp[recordno]);
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
    // getSheetRows(filename, sheetname, recordno) {
    //     console.log("has key=", myCache.getStats());
    //     // if (myCache.has('sheetdata') == true) {

    //     //     const temp = myCache.get('sheetdata');

    //     //     const rows = myCache.get('length');
    //     //     if (recordno >= rows) {
    //     //         myCache.del("sheetdata");
    //     //         myCache.del('length');
    //     //         return 3;//out of range
    //     //     }
    //     //     console.log("records=", rows);
    //     //     //    if(rows)
    //     //     //    {

    //     //     //    }
    //     //     // if(rows>)
    //     //     console.log("catches rows=", temp[recordno]);
    //     //     return temp[recordno];
    //     // }

    //     // let p = new Promise((resolve, reject) => {
    //     const file = reader.readFile(process.env.BACKUP_DIR + "/" + filename);
    //     if (file == undefined) {
    //         return 1; // file not found

    //     }
    //     else {
    //         const temp = reader.utils.sheet_to_json(file.Sheets[sheetname]);
    //         // console.log(temp.length);
    //         if (temp == undefined) {
    //             return 2; //sheet not found

    //         }
    //         else {
    //             // if (recordno >= temp.length) {
    //             //     return 3;//out of range
    //             // }
    //             // myCache.set('sheetdata', temp);
    //             // myCache.set('length', temp.length);
    //             return temp[recordno];
    //         }
    //     }


    // }
}
module.exports = new CollegeService();