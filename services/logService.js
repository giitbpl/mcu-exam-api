// const hash = require("../utilites/Hashing");
// const connection = require("../db/connection");
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
                const data = await fs.readFileSync(process.env.LOG_DIR + "/" + "info.log", 'utf8');
                resolve (data);
            } catch (err) {
                reject (err);
            }
        });
        return p;
    }

}
module.exports = new LogService();