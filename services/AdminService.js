const hash = require("../utilites/Hashing");
const connection = require("../db/connection");
// const { UserModel } = require("../models/UserModel");
// const { use } = require("../routes/admin");
var crypto = require('crypto');
const Hashing = require("../utilites/Hashing");
const moment = require('moment');

// const { head } = require("../routes/admin");
class AdminService {
    logout() {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let salt = crypto.randomBytes(20).toString('hex')
                    // let password = hash.hashPassword(user.password + salt);

                    conn.query("update INTO `user` set lastlogin=?", [moment().format('YYYY-MM-DD HH:mm:ss')], (err, result) => {
                        // console.log(err);
                        conn.release();
                        if (err) reject(err);
                        resolve(result);
                    });

                }
            });
        });
        return p;
    }
    login(username, password) {
        let p = new Promise((resolve, reject) => {
            this.getUserByEmail(username).then(data => {
                console.log("user detail=>", data);
                console.log("salt=", data[0].salt);
                console.log("password=>", password);
                let salt = data[0].salt;

                let hashPassword = hash.hashPassword(password + salt);
                // console.log(hashPassword);
                // if(hashPassword ==false)
                // {
                //     reject("password not matching")
                // }

                console.log("hash pwd=>", hashPassword);
                connection.getConnection((err, conn) => {
                    console.log("connection =>", err);
                    if (err) reject(err);
                    else {
                        conn.query("select * from user where email=? and password=?", [username, hashPassword], (err, result) => {

                            console.log(err, result);
                            if (err) reject(err);
                            else if (result.length == 0) {
                                reject("invalid username or password");
                            }
                            else {
                                if (result[0].status == 0) {
                                    reject("account is disabled");
                                }
                                else {
                                    conn.query("update`user` set lastlogin=? where uid=?", [moment().format('YYYY-MM-DD HH:mm:ss'), result[0].uid], (err1, data) => {
                                        // console.log("last login = ",data);
                                        // console.log("last login error = ",err1);
                                    });
                                    conn.release();
                                    resolve(result);
                                }
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
                // console.log("requested user detail=>", user);
                if (err) reject(err);
                else {
                    let salt = crypto.randomBytes(20).toString('hex')
                    let password = hash.hashPassword(user.pwd + salt);

                    conn.query("INSERT INTO `user`( `ipaddress`, `name`, `email`, `password`, `salt`, `status`, `comcode`, `role`,`macaddress`) values(?,?,?,?,?,?,?,?,?)", [user.ipaddress, user.name, user.email, password, salt, 1, user.comcode, user.role, user.macaddress], (err, result) => {
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
                if (err) reject(err);
                else {
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
                if (err) reject(err);
                else {

                    conn.query("SELECT `uid`, `ipaddress`, `name`, `macaddress`, `email`, `status`, `comcode`, `role`, `lastlogin`,`salt` FROM `user` where email = ? ", [email], (err, result) => {
                        console.log("users=>", result);
                        console.log(err);
                        conn.release();

                        if (err) reject(err);
                        else if (result.length > 0) resolve(result);
                        else reject("email not found");
                    });
                }
            });
        });
        return p;
    }
    getUserByUid(uid) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("SELECT `uid`, `ipaddress`, `name`, `macaddress`, `email`, `status`, `comcode`, `role`, `lastlogin`,`salt` FROM `user` where uid = ?", [uid], (err, result) => {
                        // console.log("users=>", result);
                        // console.log(err);
                        conn.release();

                        if (err) reject(err);
                        else if (result.length > 0) resolve(result);
                        else reject(err);
                    });
                }
            });
        });
        return p;
    }
    getUserByIpAddress(ipaddress) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                if (err) reject(err);
                else {

                    conn.query("select *from user where ipaddress = ?", [ipaddress], (err, result) => {
                        console.log("result=", result);
                        // console.log("users=>", result);
                        // console.log(err);
                        conn.release();

                        if (err) reject(err);
                        else if (result.length > 0) resolve(result);
                        else if (result.length == 0) reject("ipaddress already in use");
                        else reject(err);
                    });
                }
            });
        });
        return p;
    }
    getUserByMacaddress(macaddress) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select *from user where macaddress = ?", [macaddress], (error, result) => {
                        console.log("macaddress=>", result.length);
                        console.log(error);
                        conn.release();

                        if (error) reject(error);
                        else if (result.length > 0) resolve(result);
                        else if (result.length == 0) reject("mac address not found");

                       // else reject(err);
                    });
                }
            });
        });
        return p;
    }
    getallIpAddress() {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select ipaddress  from user", (err, result) => {
                        // console.log("macaddress=>", result);
                        console.log(err);
                        conn.release();

                        if (err) reject(err);
                        else resolve(result);
                    });
                }
            });
        });
        return p;
    }
    getallMacAddress() {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select macaddress  from user", (err, result) => {
                        console.log("macaddress=>", result);
                        console.log(err);
                        conn.release();

                        if (err) reject(err);
                        else resolve(result);
                    });
                }
            });
        });
        return p;
    }
    changePassword(request) {
        console.log(request);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    let salt = crypto.randomBytes(20).toString('hex')
                    let password = hash.hashPassword(request.pwd + salt);
                    this.getUserByUid(request.uid).then((user) => {
                        console.log(user);
                        let oldpwd = hash.hashPassword(request.oldpwd + user[0].salt);
                        console.log("oldpwd=>", oldpwd);
                        // conn.query(
                        conn.query("update user set password =? ,salt =? where uid=? and email =? and password =?", [password, salt, user[0].uid, user[0].email, oldpwd], (err, result) => {
                            console.log(err, result);
                            if (err) reject(err);
                            else resolve(result);
                        });
                    }).catch(err => {
                        console.log("err=>", err);
                        reject(err);
                    });
                    // conn.query("update ", (err, result) => {
                    //     // console.log("macaddress=>", result);
                    //     console.log(err);
                    //     conn.release();

                    //     if (err) reject(err);
                    //     else resolve(result);
                    // });
                }
            });
        });
        return p;
    }
    updateUser(userdetail,uid) {
        console.log(userdetail);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("UPDATE `user` SET `name`=?,`role`=? WHERE uid=?",
                     [userdetail.ipaddress,userdetail.name,userdetail.macaddress,userdetail.comcode,userdetail.role,uid], (err, result) => {
                        console.log(err, result);
                        if (err) reject(err);
                        else resolve(result);
                    });

                   
                }
            });
        });
        return p;
    }
    changeUserStatus(uid)
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("UPDATE user set status=case when status=1 then 0 when status=0 then 1 end where uid=?",[uid], (err, result) => {
                        console.log(err, result);
                        if (err) reject(err);
                        else resolve(result);
                    });

                }
            });
        });
        return p;
    }
    serverStart()
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log("requested user detail=>", user);
                if (err) reject(err);
                else {
                    // let salt = crypto.randomBytes(20).toString('hex')
                    // let password = hash.hashPassword(user.pwd + salt);

                    conn.query("INSERT INTO server_log (start) VALUES (NOW());", (err, result) => {
                        // console.log("err");
                        conn.release();
                        if (err) reject(err);
                        resolve(result);
                    });

                }
            });
        });
        return p;
    }
    userstatics()
    {
        
    }
}
module.exports = new AdminService();