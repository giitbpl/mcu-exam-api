// const hash = require("../utilites/Hashing");
const connection = require("../db/connection");
// const { UserModel } = require("../models/UserModel");
// const { use } = require("../routes/admin");
// var crypto = require('crypto');
// const Hashing = require("../utilites/Hashing");
// const reader = require('xlsx')
// const NodeCache = require("node-cache");
// const myCache = new NodeCache();
require("dotenv").config();
const fs = require('fs');
class LogService {

    async readInfoLogs() {
        let p = new Promise(async (resolve, reject) => {

            try {
                const data = await fs.readFileSync("./logs/access.log", 'utf8');
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
        return p;
    }
    save(logdetail) {
        // console.log(logdetail);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let salt = crypto.randomBytes(20).toString('hex')
                    // let password = hash.hashPassword(user.password + salt);

                    conn.query("INSERT INTO `activity_log` ( `uid`, `ip`, `method`, `url`, `status`) values(?,?,?,?,?)", [logdetail.uid, logdetail.ip, logdetail.method, logdetail.url, logdetail.status], (err, result) => {
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
    getAllLOgs() {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let salt = crypto.randomBytes(20).toString('hex')
                    // let password = hash.hashPassword(user.password + salt);

                    conn.query("SELECT activity_log.*,user.name from activity_log left join user on activity_log.uid=user.uid order by activity_log.timestamp desc", (err, result) => {
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
    deleteLogByduration(duration) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let salt = crypto.randomBytes(20).toString('hex')
                    // let password = hash.hashPassword(user.password + salt);

                    conn.query("delete from activity_log where timestamp < DATE_SUB(NOW(), INTERVAL "+duration+" MONTH)", (err, result) => {
                        console.log(err);
                        console.log(result);
                        conn.release(); 
                        if (err) reject(err);
                        resolve(result);
                    });

                }
            });
        });
        return p;
    }
}
module.exports = new LogService();