const reader = require('xlsx')
const connection = require("../db/connection");
// const { UserModel } = require("../models/UserModel");
const { use } = require("../routes/admin");
// const reader = require('xlsx')
const NodeCache = require("node-cache");
// const user = require("./user");
require("dotenv").config();
// const connection = require("../db/connection");

class SubjectService {
    getAll() {
        // console.log(data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select *from subject_code_master", (err, result) => {
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
   getSubjectByCodeList(codeList) {
    console.log(codeList);
    let p = new Promise((resolve, reject) => {
        connection.getConnection((err, conn) => {
            // console.log(err);
            if (err) reject(err);
            else {

                conn.query("SELECT * FROM subject_code_master WHERE SUBJE in ("+codeList+")", (err, result) => {
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
            //  console.log(data);
            
            // let address = data["ADDRESS"];
            // if(address == undefined) {
                
            //     address = "";
            // }
            // console.log("address=>",address);
             //  if(data["ADDRESS"])
                conn.query("INSERT INTO `subject_code_master`(`EXAM_CODE`, `EXAM_NAME`, `SUBJE`, `SUBJECT_NAME`, `THEORY_MAX_MARKS`, `THEORY_MIN_MARKS`, `PRACTICAL_MAX_MARKS`, `PRACTICAL_MIN_MARKS`, `SESSIONAL_MAX_MARKS`, `SESSIONAL_MIN_MARKS`, `TOTAL_MAX_MARKS`, `TOTAL_MIN_MARKS`, `CREDIT`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [data["EXAM_CODE"],data["EXAM_NAME"],data["SUBJE"],data["SUBJECT_NAME"],data["THEORY_MAX_MARKS"],data["THEORY_MIN_MARKS"],data["PRACTICAL_MAX_MARKS"],data["PRACTICAL_MIN_MARKS"],data["SESSIONAL_MAX_MARKS"],data["SESSIONAL_MIN_MARKS"],data["TOTAL_MAX_MARKS"],data["TOTAL_MIN_MARKS"],data["CREDIT"]], (err, result) => {
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
    // if (myCache.has('sheetdata') == true) {

    //     const temp = myCache.get('sheetdata');

    //     const rows = myCache.get('length');
    //     if (recordno >= rows) {
    //         myCache.del("sheetdata");
    //         myCache.del('length');
    //         return 3;//out of range
    //     }
    //     console.log("records=", rows);
    //     //    if(rows)
    //     //    {

    //     //    }
    //     // if(rows>)
    //     console.log("catches rows=", temp[recordno]);
    //     return temp[recordno];
    // }

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
            // if (recordno >= temp.length) {
            //     return 3;//out of range
            // }
            // myCache.set('sheetdata', temp);
            // myCache.set('length', temp.length);
            return temp[recordno];
        }
    }


}
}
module.exports = new SubjectService();