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
                        // console.log(err, result);
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

                    conn.query("select * from course_master where code=? ", [code], (err, result) => {
                        console.log(err, result);
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
    getCourseNameByType(type) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select * from course_master where type=? order by code", [type], (err, result) => {
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
    createCourseTable(tablename)
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("CREATE TABLE " + "course_"+tablename + " LIKE master_template;", (err, result) => {
                        // console.log(err, result);
                        conn.release(); 
                        if (err) reject(err);
                        else resolve(result);
                    });

                }
            });
        });
        return p;
    }
    update(data,tablename)
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("update "+tablename+" set name=? ,fhname=?, hname=?,mname=? ,sex=? where enrollno=?",[data["name"],data["fhname"],data["hname"],data["mname"],data["sex"],data["enrollno"]], (err, result) => {
                        // console.log(err, result);
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
module.exports = new CourseService();