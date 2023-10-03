const hash = require("../utilites/Hashing");
const connection = require("../db/connection");
// const { UserModel } = require("../models/UserModel");
// const { use } = require("../routes/admin");
var crypto = require('crypto');
const Hashing = require("../utilites/Hashing");

// const { head } = require("../routes/admin");
class AdminService {

    login(username, password) {
        let p = new Promise((resolve, reject) => {
            this.getUserByEmail(username).then(data => {
                // console.log("data=", data);
                let salt = data[0].salt;

                let hashPassword = hash.hashPassword(password + salt);


                // console.log("hash pwd=>", hashPassword);
                connection.getConnection((err, conn) => {
                    console.log("connection =>",err);
                    if(err) reject(err);
                    else
                    {
                    conn.query("select * from user where email=? and password=? and role=1", [username, hashPassword], (err, result) => {
                        conn.release();
                        // console.log(err, result);
                        if (err) reject(err);
                        else if (result.length == 0) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                }
                });



            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
        return p;
    }
    register(user) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if(err) reject(err);
                else
                {
                let salt = crypto.randomBytes(20).toString('hex')
                let password = hash.hashPassword(user.password + salt);

                conn.query("INSERT INTO `user`( `ipaddress`, `name`, `email`, `password`, `salt`, `status`, `comcode`, `role`) values(?,?,?,?,?,?,?,?)", [user.ipaddress, user.name, user.email, password, salt, 1, user.comcode, 0], (err, result) => {
                    // console.log(err);
                    conn.release();
                    if (err) reject(err);
                    resolve(result);
                });

            }
            });
        });
        return p;
        // console.log(user.ipaddress);
    }
    getAllUsers() {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if(err) reject(err);
                else
                {
                conn.query("select uid,ipaddress,name,email,status,role,comcode from user where role != 1", (err, result) => {
                    //  console.log(result);
                    conn.release();
                    if (err) reject(err);
                    resolve(result);
                });
            }
            });
        });
        return p;
    }
    getUserByEmail(email) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if(err) reject(err);
                else
                {

                    conn.query("select *from user where email = ? and role=1", [email], (err, result) => {
                        // console.log("users=>", result);
                        // console.log(err);
                        conn.release();
                        
                        if (err) reject(err);
                        else if(result.length>0)resolve(result);
                        else reject(err);
                    });
                }
            });
        });
        return p;
    }
}
module.exports = new AdminService();