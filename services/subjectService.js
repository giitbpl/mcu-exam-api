const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
const connection = require("../db/connection");

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
}
module.exports = new SubjectService();