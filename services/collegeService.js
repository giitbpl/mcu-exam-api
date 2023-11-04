const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
const connection = require("../db/connection");

class CourseService {
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
            console.log(data);

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
                 console.log(data);
                    // conn.query("INSERT INTO " + tablename + " (`code`, `cc_name`, `address`, `city`, `dist`, `state`, `pin`) VALUES ('?','?','?','?','?','?','?')", [], (err, result) => {
                    //         console.log(err);
                    //         conn.release();
                    //         if (err != null) {
                    //             if (err.errno == 1054) {
                    //                 reject({
                    //                     "error": "true",
                    //                     "message": "database error"
                    //                 });
                    //             } else {
                    //                 reject({
                    //                     "error": "true",
                    //                     "message": "server error"
                    //                 });
                    //             }
                    //             // flag = true;
                    //             // throw err;
                    //             // return;
                    //         }
                    //         else {
                    //             // continue;
                    //             resolve({
                    //                 "error": "false",
                    //                 "message": "success"
                    //             });
                    //         }

                    //     });

                  
                });
            }
            // });
            // });
        });
        return pro;
        //end


    }
}
module.exports = new CourseService();