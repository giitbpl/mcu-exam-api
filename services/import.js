const hash = require("../utilites/Hashing");
const connection = require("../db/connection");
const { UserModel } = require("../models/UserModel");
const { use } = require("../routes/admin");
var crypto = require('crypto');
const Hashing = require("../utilites/Hashing");
const reader = require('xlsx')
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class ImportService {
    async import(filename, sheetname, recordno, tablename) {
        let pro = new Promise(async (resolve, reject) => {

            let data = await this.getSheetRows(filename, sheetname, recordno);
            // console.log(data);

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
                    // for (let i = 0; i < sheetdata.length; i++) {

                    // this.insetRecord(sheetdata.data[i], conn)
                    conn.query("INSERT INTO " + "course_"+ tablename + " (`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`, `CGPA`, `SGPA`, `sub_credit`, `sub_credit_point`, `sub_grade`, `sub_grade_point`, `sub_max`, `sub_min`, `sub_total`, `total_credit`, `total_credit_point`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                        data[`applicationno`], data[`enrollno`], data[`rollno`], data[`yrtermcode`], data[`examcode`], data[`examcode2`], data[`examname`], data[`examnamempo`], data[`progcodempo`], data[`stdcent`], data[`stdcentname`], data[`examcent`], data[`examcentname`], data[`pracent`], data[`pracentname`], data[`name`], data[`fhname`], data[`hname`], data[`mname`], data[`sex`], data[`status`], data[`category`], data[`medium`], data[`mstatus`], data[`dob`], data[`subcode`], data[`paper`], data[`thobt`], data[`thoutof`], data[`thresult`], data[`threvised`], data[`probt`], data[`proutof`], data[`prresult`], data[`prrevised`], data[`intobt`], data[`intoutof`], data[`intresult`], data[`intrevised`], data[`subresult`], data[`semobt`], data[`semoutof`], data[`semresult`], data[`sempercentage`], data[`semdivision`], data[`withheld`], data[`graceind`], data[`gracecurr`], data[`msheetno`], data[`agrtotobtn`], data[`agrtotout`], data[`agrresult`], data[`agrpercent`], data[`agrdiv`], data[`agrremark1`], data[`remark1`], data[`remark2`], data[`mappingfile`], data[`schemefile`], data[`studyfile`], data[`examfile`], data[`datafilefile`], data[`ID`], data[`CGPA`], data[`SGPA`], data[`sub_credit`], data[`sub_credit_point`], data[`sub_grade`], data[`sub_grade_point`], data[`sub_max`], data[`sub_min`], data[`sub_total`], data[`total_credit`], data[`total_credit_point`]], (err, result) => {
                            // console.log(err);
                            conn.release();
                            if (err != null) {
                                if (err.errno == 1054) {
                                    reject({
                                        "error": "true",
                                        "message": "database error"
                                    });
                                } if(err.errno ==1146)
                                {
                                    reject({
                                        "error": "true",
                                        "message": "table not exists"
                                    });
                                }
                                else {
                                    reject({
                                        "error": "true",
                                        "message": "server error"
                                    });
                                }
                                // flag = true;
                                // throw err;
                                // return;
                            }
                            else {
                                // continue;
                                resolve({
                                    "error": "false",
                                    "message": "success"
                                });
                            }

                        });

                    // }
                    // resolve({
                    //     "error": "false",
                    //     "message": "success imported"
                    // });
                    // console.log("outside the =", flag);
                });
            }
            // });
            // });
        });
        return pro;
        //end


    }
   
    getSheetRows(filename, sheetname, recordno) {
        console.log("has key=", myCache.getStats());
        if (myCache.has('sheetdata') == true) {

            const temp = myCache.get('sheetdata');

            const rows = myCache.get('length');
            if (recordno >= rows) {
                myCache.del("sheetdata");
                myCache.del('length');
                return 3;//out of range
            }
            console.log("records=", rows);
            //    if(rows)
            //    {

            //    }
            // if(rows>)
            console.log("catches rows=", temp[recordno]);
            return temp[recordno];
        }

        // let p = new Promise((resolve, reject) => {
        const file = reader.readFile(process.env.BACKUP_DIR + "/" + filename);
        if (file == undefined) {
            return 1; // file not found

        }
        else {
            const temp = reader.utils.sheet_to_json(file.Sheets[sheetname]);
            // console.log(temp.length);
            if (temp == undefined) {
                return 2; //sheet not found

            }
            else {
                if (recordno >= temp.length) {
                    return 3;//out of range
                }
                myCache.set('sheetdata', temp);
                myCache.set('length', temp.length);
                return temp[recordno];
            }
        }


    }
    // * verify the imported excel data with mysql table structure
    verifyData(columns,tablename) {
        console.log("table name=>",tablename);
        let pro = new Promise(async (resolve, reject) => {
            connection.getConnection((err, conn) => {
                conn.query("SHOW COLUMNS FROM "+tablename, (error, result) => {
                  //  console.log(result);
                  //  console.log(columns);
                    // Compare the database column length and.File column length.
                    if (result.length == columns.length) {

                        // console.log(columns);
                        result.forEach(row => {
                            // console.log(col.Field)
                            columns.forEach(col => {
                                if (row.Field != col) {
                                    return false;
                                }

                            })

                        }
                        );
                        resolve({
                            "error": "false",
                            "message": "structures matched"
                        });
                    }
                    else {
                        reject({
                            "error": "true",
                            "message": "structures not matched"
                        });
                    }
                });
            });
        });
        return pro;
    }
    createTable(table_name) {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log("requested user detail=>",user);
                if (err) reject(err);
                else {


                    conn.query("CREATE TABLE " + table_name + " LIKE college_master;", (err, result) => {
                        // console.log(err.code);
                        conn.release();
                        if (err) reject(err);
                        resolve(result);
                    });

                }
            });
        });
        return p;
    }
    getAllTableNames() {
        let p = new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                // console.log("requested user detail=>",user);
                if (err) reject(err);
                else {


                    conn.query("show tables", (err, result) => {
                        // console.log(result);
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
    getAllDBColumns(table_name) {
        console.log(table_name);
        let pro = new Promise(async (resolve, reject) => {
            connection.getConnection((err, conn) => {
                conn.query("SHOW COLUMNS FROM " + table_name, (error, result) => {
                    conn.release();
                    console.log(error, result);
                    // conn.query("SELECT column_name FROM information_schema.columns  WHERE table_name='master_template'; ", (error, result) => {
                    // console.log(result.length);
                    if (error) reject(error);
                    resolve(result);
                });
            });
        });
        return pro;
    }
}
module.exports = new ImportService();