const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
const connection = require("../db/connection");
const courseService = require("./courseService");

class SearchService
{
    search(data)
    {
        console.log(data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    let tablename= await courseService.getCourseNameByCode(data.coursecode);
                    console.log(tablename);
                    conn.query("select *from "+tablename[0].shortname+" where enrollno=? and yrtermcode=?",[data.envno,data.session_name], (err, result) => {
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
     async getSessioNameByCourseCode(courseCode,enrollment)  
     {
        
          let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                console.log(err);
                if (err) reject(err);
                else {
                    let tablename= await courseService.getCourseNameByCode(courseCode);
                     console.log("table name=>",tablename);
                     console.log("request name=>",courseCode);
                     console.log("request name=>",enrollment);
            
                    conn.query("select distinct yrtermcode from "+tablename[0].shortname+" where enrollno=?",[enrollment], (err, result) => {
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
module.exports = new SearchService();