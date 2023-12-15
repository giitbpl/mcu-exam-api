const hash = require("../utilites/Hashing");
const connection = require("../db/connection");
const { UserModel } = require("../models/UserModel");
const { use } = require("../routes/admin");
var crypto = require('crypto');
const Hashing = require("../utilites/Hashing");
const reader = require('xlsx')
const NodeCache = require("node-cache");
const myCache = new NodeCache();
var async = require("async");

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
                    conn.query("INSERT INTO " + "course_" + tablename + " (`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`, `CGPA`, `SGPA`, `sub_credit`, `sub_credit_point`, `sub_grade`, `sub_grade_point`, `sub_max`, `sub_min`, `sub_total`, `total_credit`, `total_credit_point`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                        data[`applicationno`], data[`enrollno`], data[`rollno`], data[`yrtermcode`], data[`examcode`], data[`examcode2`], data[`examname`], data[`examnamempo`], data[`progcodempo`], data[`stdcent`], data[`stdcentname`], data[`examcent`], data[`examcentname`], data[`pracent`], data[`pracentname`], data[`name`], data[`fhname`], data[`hname`], data[`mname`], data[`sex`], data[`status`], data[`category`], data[`medium`], data[`mstatus`], data[`dob`], data[`subcode`], data[`paper`], data[`thobt`], data[`thoutof`], data[`thresult`], data[`threvised`], data[`probt`], data[`proutof`], data[`prresult`], data[`prrevised`], data[`intobt`], data[`intoutof`], data[`intresult`], data[`intrevised`], data[`subresult`], data[`semobt`], data[`semoutof`], data[`semresult`], data[`sempercentage`], data[`semdivision`], data[`withheld`], data[`graceind`], data[`gracecurr`], data[`msheetno`], data[`agrtotobtn`], data[`agrtotout`], data[`agrresult`], data[`agrpercent`], data[`agrdiv`], data[`agrremark1`], data[`remark1`], data[`remark2`], data[`mappingfile`], data[`schemefile`], data[`studyfile`], data[`examfile`], data[`datafilefile`], data[`ID`], data[`CGPA`], data[`SGPA`], data[`sub_credit`], data[`sub_credit_point`], data[`sub_grade`], data[`sub_grade_point`], data[`sub_max`], data[`sub_min`], data[`sub_total`], data[`total_credit`], data[`total_credit_point`]], (err, result) => {
                            // console.log(err);
                            conn.release();
                            if (err != null) {
                                if (err.errno == 1054) {
                                    reject({
                                        "error": "true",
                                        "message": "database error"
                                    });
                                } if (err.errno == 1146) {
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

    import2(records, tablename) {
        // console.log("data-length=>",data[0]);
        console.log("tablename=>", tablename);
        let pro = new Promise((resolve, reject) => {


            connection.getConnection((error, conn) => {
             
          
                async.forEachOf(records, (data, key, callback) => {

                    conn.query("INSERT INTO " + "course_" + tablename + " (`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`, `CGPA`, `SGPA`, `sub_credit`, `sub_credit_point`, `sub_grade`, `sub_grade_point`, `sub_max`, `sub_min`, `sub_total`, `total_credit`, `total_credit_point`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                        data[`applicationno`], data[`enrollno`], data[`rollno`], data[`yrtermcode`], data[`examcode`], data[`examcode2`], data[`examname`], data[`examnamempo`], data[`progcodempo`], data[`stdcent`], data[`stdcentname`], data[`examcent`], data[`examcentname`], data[`pracent`], data[`pracentname`], data[`name`], data[`fhname`], data[`hname`], data[`mname`], data[`sex`], data[`status`], data[`category`], data[`medium`], data[`mstatus`], data[`dob`], data[`subcode`], data[`paper`], data[`thobt`], data[`thoutof`], data[`thresult`], data[`threvised`], data[`probt`], data[`proutof`], data[`prresult`], data[`prrevised`], data[`intobt`], data[`intoutof`], data[`intresult`], data[`intrevised`], data[`subresult`], data[`semobt`], data[`semoutof`], data[`semresult`], data[`sempercentage`], data[`semdivision`], data[`withheld`], data[`graceind`], data[`gracecurr`], data[`msheetno`], data[`agrtotobtn`], data[`agrtotout`], data[`agrresult`], data[`agrpercent`], data[`agrdiv`], data[`agrremark1`], data[`remark1`], data[`remark2`], data[`mappingfile`], data[`schemefile`], data[`studyfile`], data[`examfile`], data[`datafilefile`], data[`ID`], data[`CGPA`], data[`SGPA`], data[`sub_credit`], data[`sub_credit_point`], data[`sub_grade`], data[`sub_grade_point`], data[`sub_max`], data[`sub_min`], data[`sub_total`], data[`total_credit`], data[`total_credit_point`]], (err, result) => {

                            // callback(i);
                            console.log(key, " ", records.length);
                            if (err) {
                                callback("true");
                            }
                            if (key == (records.length - 1)) {
                                callback("false");
                            }
                        });
              
                }, err => {

                    console.log("err=>", err);
                    console.log("callback");
                    conn.release();
                    if (err == "false") {
                        resolve({
                            "error": "false",
                            "message":  records.length + " data imported successfully "
                        });
                    }
                    else
                    {
                        reject({
                        "error": "true",
                        "message":err
                    });
                    }
                
                    
                    // console.log(err);
                    // reject({
                    //     "error": "true",
                    //     "message":err
                    // });
                
            });
            // if (await this.processData(conn, records, tablename) == true) {
            //     resolve({
            //         "error": "false",
            //         "message": "success imported"
            //     });
            // }
            // else {
            //     reject({
            //         "error": "true",
            //         "message": errorMessage
            //     });
            // }
            //   for (i = 0; i < data.length; i++) {
            //         // let data = data[i];
            //         conn.query("INSERT INTO " + "course_" + tablename + " (`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`, `CGPA`, `SGPA`, `sub_credit`, `sub_credit_point`, `sub_grade`, `sub_grade_point`, `sub_max`, `sub_min`, `sub_total`, `total_credit`, `total_credit_point`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            //             data[i][`applicationno`], data[i][`enrollno`], data[i][`rollno`], data[i][`yrtermcode`], data[i][`examcode`], data[i][`examcode2`], data[i][`examname`], data[i][`examnamempo`], data[i][`progcodempo`], data[i][`stdcent`], data[i][`stdcentname`], data[i][`examcent`], data[i][`examcentname`], data[i][`pracent`], data[i][`pracentname`], data[i][`name`], data[i][`fhname`], data[i][`hname`], data[i][`mname`], data[i][`sex`], data[i][`status`], data[i][`category`], data[i][`medium`], data[i][`mstatus`], data[i][`dob`], data[i][`subcode`], data[i][`paper`], data[i][`thobt`], data[i][`thoutof`], data[i][`thresult`], data[i][`threvised`], data[i][`probt`], data[i][`proutof`], data[i][`prresult`], data[i][`prrevised`], data[i][`intobt`], data[i][`intoutof`], data[i][`intresult`], data[i][`intrevised`], data[i][`subresult`], data[i][`semobt`], data[i][`semoutof`], data[i][`semresult`], data[i][`sempercentage`], data[i][`semdivision`], data[i][`withheld`], data[i][`graceind`], data[i][`gracecurr`], data[i][`msheetno`], data[i][`agrtotobtn`], data[i][`agrtotout`], data[i][`agrresult`], data[i][`agrpercent`], data[i][`agrdiv`], data[i][`agrremark1`], data[i][`remark1`], data[i][`remark2`], data[i][`mappingfile`], data[i][`schemefile`], data[i][`studyfile`], data[i][`examfile`], data[i][`data[i]filefile`], data[i][`ID`], data[i][`CGPA`], data[i][`SGPA`], data[i][`sub_credit`], data[i][`sub_credit_point`], data[i][`sub_grade`], data[i][`sub_grade_point`], data[i][`sub_max`], data[i][`sub_min`], data[i][`sub_total`], data[i][`total_credit`], data[i][`total_credit_point`]], (err, result) => {
            //                 if (err) {
            //                     errorFlag = true;
            //                     errorMessage = err.message;
            //                     return false;
            //                 }
            //                 // console.log("record no =>",i);
            //             });

            //     }
            //    conn.query()

            //   records.forEach (  data => {

            //         conn.query("INSERT INTO " + "course_" + tablename + " (`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`, `CGPA`, `SGPA`, `sub_credit`, `sub_credit_point`, `sub_grade`, `sub_grade_point`, `sub_max`, `sub_min`, `sub_total`, `total_credit`, `total_credit_point`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            //             data[`applicationno`], data[`enrollno`], data[`rollno`], data[`yrtermcode`], data[`examcode`], data[`examcode2`], data[`examname`], data[`examnamempo`], data[`progcodempo`], data[`stdcent`], data[`stdcentname`], data[`examcent`], data[`examcentname`], data[`pracent`], data[`pracentname`], data[`name`], data[`fhname`], data[`hname`], data[`mname`], data[`sex`], data[`status`], data[`category`], data[`medium`], data[`mstatus`], data[`dob`], data[`subcode`], data[`paper`], data[`thobt`], data[`thoutof`], data[`thresult`], data[`threvised`], data[`probt`], data[`proutof`], data[`prresult`], data[`prrevised`], data[`intobt`], data[`intoutof`], data[`intresult`], data[`intrevised`], data[`subresult`], data[`semobt`], data[`semoutof`], data[`semresult`], data[`sempercentage`], data[`semdivision`], data[`withheld`], data[`graceind`], data[`gracecurr`], data[`msheetno`], data[`agrtotobtn`], data[`agrtotout`], data[`agrresult`], data[`agrpercent`], data[`agrdiv`], data[`agrremark1`], data[`remark1`], data[`remark2`], data[`mappingfile`], data[`schemefile`], data[`studyfile`], data[`examfile`], data[`datafilefile`], data[`ID`], data[`CGPA`], data[`SGPA`], data[`sub_credit`], data[`sub_credit_point`], data[`sub_grade`], data[`sub_grade_point`], data[`sub_max`], data[`sub_min`], data[`sub_total`], data[`total_credit`], data[`total_credit_point`]], (err, result) => {
            //                 if (err) {
            //                     errorFlag = true;
            //                     errorMessage = err.message;
            //                     return false;
            //                 }
            //                 //  console.log("record no =>",i);
            //             });

            //     });



            // }
            // resolve({
            //     "error": "false",
            //     "message": "success imported"
            // });
            // console.log("outside the =", flag);
        });
        // }
        // });
        // });
    });
        return pro;
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
        //     //    if(rows)
        //     //    {

        //     //    }
        //     // if(rows>)
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
verifyData(columns, tablename) {
    console.log("table name=>", tablename);
    let pro = new Promise(async (resolve, reject) => {
        connection.getConnection((err, conn) => {
            conn.query("SHOW COLUMNS FROM " + tablename, (error, result) => {
                //    console.log(result);
                //    console.log(columns);
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
    async processData(conn, records, tablename) {
    records.forEach(data => {

        conn.query("INSERT INTO " + "course_" + tablename + " (`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`, `CGPA`, `SGPA`, `sub_credit`, `sub_credit_point`, `sub_grade`, `sub_grade_point`, `sub_max`, `sub_min`, `sub_total`, `total_credit`, `total_credit_point`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            data[`applicationno`], data[`enrollno`], data[`rollno`], data[`yrtermcode`], data[`examcode`], data[`examcode2`], data[`examname`], data[`examnamempo`], data[`progcodempo`], data[`stdcent`], data[`stdcentname`], data[`examcent`], data[`examcentname`], data[`pracent`], data[`pracentname`], data[`name`], data[`fhname`], data[`hname`], data[`mname`], data[`sex`], data[`status`], data[`category`], data[`medium`], data[`mstatus`], data[`dob`], data[`subcode`], data[`paper`], data[`thobt`], data[`thoutof`], data[`thresult`], data[`threvised`], data[`probt`], data[`proutof`], data[`prresult`], data[`prrevised`], data[`intobt`], data[`intoutof`], data[`intresult`], data[`intrevised`], data[`subresult`], data[`semobt`], data[`semoutof`], data[`semresult`], data[`sempercentage`], data[`semdivision`], data[`withheld`], data[`graceind`], data[`gracecurr`], data[`msheetno`], data[`agrtotobtn`], data[`agrtotout`], data[`agrresult`], data[`agrpercent`], data[`agrdiv`], data[`agrremark1`], data[`remark1`], data[`remark2`], data[`mappingfile`], data[`schemefile`], data[`studyfile`], data[`examfile`], data[`datafilefile`], data[`ID`], data[`CGPA`], data[`SGPA`], data[`sub_credit`], data[`sub_credit_point`], data[`sub_grade`], data[`sub_grade_point`], data[`sub_max`], data[`sub_min`], data[`sub_total`], data[`total_credit`], data[`total_credit_point`]], (err, result) => {
                // if (err) {
                //     errorFlag = true;
                //     errorMessage = err.message;
                //     return false;
                // }
                //  console.log("record no =>",i);
            });

    });
    return true;
}
afterProcess
}
module.exports = new ImportService();