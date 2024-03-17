const connection = require("../db/connection");
class UserActivityLogService {
    updateSearchLog(uid) {
        // console.log(data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("update user_activity_log set search=search+1 where uid=?", [uid], (err, result) => {
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
    updateLoginLog(uid) {
        // console.log(data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("update user_activity_log set login=login+1 where uid=?", [uid], (err, result) => {
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
    createUserActivityLog(uid) {
       
            // console.log(data);
            let p = new Promise((resolve, reject) => {
                connection.getConnection((err, conn) => {
                    // console.log(err);
                    if (err) reject(err);
                    else {

                        conn.query("insert into user_activity_log (uid) values(?)",[uid], (err, result) => {
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
    getUserActivityLog(uid)
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {

                    conn.query("select `search`, `login` from user_activity_log where uid=?",[uid], (err, result) => {
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
module.exports = new UserActivityLogService();
