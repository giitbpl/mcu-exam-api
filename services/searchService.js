const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
const connection = require("../db/connection");

class SearchService
{
    search(data)
    {
        // console.log(data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select *from "+data.tablename+" where enrollno=? or rollno=?",[data.envno,data.roll], (err, result) => {
                        // console.log(err, result);
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