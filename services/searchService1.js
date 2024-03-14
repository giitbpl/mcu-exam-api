const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
const connection = require("../db/connection");
const courseService = require("./courseService");

class SearchService {
    search(data) {
        // console.log("search-data=",data);
        let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let tablename= await courseService.getCourseNameByCode(data.coursecode);
                    // let tablename = "course_" + data.coursecode;
                    let tablename="course_media";
                    if(data.coursecode == 14 || data.coursecode ==16 || data.coursecode ==17)
                    {
                        tablename = "course_" + data.coursecode;

                    }
                    // console.log(tablename);
                    let n = data.session_name.split("-");
                    let tablename2 = "college_" + n[0].toLowerCase() + "_" + n[1];
                    let sem=data.sem;
                    // console.log(tablename2);

               
                    // SELECT A.*,B.`COLLEGE / CENTER NAME`,B.city,B.dist,B.session FROM course_media as A LEFT JOIN college_master as B on A.examcent=B.code where A.enrollno='AW1020999023' and A.yrtermcode='DEC-2020' and SUBSTRING(A.examname,1,1)=1 and B.session='DEC-2020';

                    let sql = "SELECT A.*,B.`COLLEGE / CENTER NAME`,B.city,B.dist FROM " + tablename + " as A LEFT JOIN " + tablename2 + " as B on A.examcent=B.code where A.enrollno=? and A.yrtermcode=? and SUBSTRING(A.examname,1,1)=?";
                    // let sql = "SELECT A.rollno,A.name,A.fhname,A.mname,A.enrollno,A.subcode,A.paper,A.thobt,A.thoutof,A.thresult,A.threvised,A.probt,A.proutof,A.prresult,A.prrevised,A.intobt,A.intoutof,A.intresult,A.intrevised,A.subresult,A.sub_total,A.sub_max,A.sub_min,A.sub_credit,A.sub_grade_point,A.sub_credit_point,A.sub_grade,A.semobt,A.semoutof,A.semresult,A.status,A.medium,A.category,A.msheetno,A.stdcent,A.examcent,A.semoutof,A.sub_max,A.sub_min,A.sub_grade,A.sub_grade_point,A.CGPA,A.SGPA,A.sub_total,A.total_credit,A.total_credit_point,B.`COLLEGE / CENTER NAME`,B.city,B.dist FROM " + tablename + " as A LEFT JOIN " + tablename2 + " as B on A.examcent=B.code where A.enrollno=? and A.yrtermcode=?";
                    // let sql=`SELECT ${tablename}.rollno,${tablename}.name,${tablename}.fhname,${tablename}.mname,${tablename}.enrollno,${tablename}.status,${tablename}.medium,${tablename}.category,${tablename}.msheetno,${tablename}.stdcent,${tablename}.examcent,${tablename}.semoutof,${tablename}.sub_max,${tablename}.sub_min,${tablename}.sub_grade,${tablename}.sub_grade_point,${tablename}.CGPA,${tablename}.SGPA,${tablename}.sub_total,${tablename}.total_credit,${tablename}.total_credit_point,"${tablename2}".'COLLEGE / CENTER NAME',${tablename2}.city,${tablename2}.dist FROM ${tablename} LEFT JOIN ${tablename2} on ${tablename}.examcent=${tablename2}.code where ${tablename}.enrollno=? and ${tablename}.yrtermcode=?`;
                    // conn.query("select *from "+tablename+" where enrollno=? and yrtermcode=? and SUBSTRING(examname,1,1)=?",[data.envno,data.session_name,data.sem], (err, result) => {
                    // console.log(sql);
                    conn.query(sql, [data.envno, data.session_name,sem], (err, result) => {
                    //    console.log("result", result);
                        conn.release();
                        if (err) reject(err);
                        else resolve(result);
                    });

                }
            });
        });
        return p;
    }
    async getSessioNameByCourseCode(courseCode, enrollment,semester) {

        let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                // console.log("courseCodecode=",courseCode);
                if (err) reject(err);
                else {
                    let tablename="course_media";
                    if(courseCode == 14 || courseCode ==16 || courseCode ==17)
                    {
                        tablename = "course_" + courseCode;

                    }

                    // let tablename= await courseService.getCourseNameByCode(courseCode);
                    //  tablename = "course_" + courseCode;
                    //  console.log("table name=>",tablename);
                    //  console.log("request name=>",courseCode);
                    //  console.log("request name=>",enrollment);

                    // conn.query("select distinct yrtermcode from "+tablename+" where enrollno=?",[enrollment], (err, result) => {
                    // conn.query("select distinct yrtermcode from " + tablename + " where  SUBSTRING(examcode2, CHARACTER_LENGTH(examcode2)-1, 1)=? and enrollno=?", [semester,enrollment], (err, result) => {
                    conn.query("select distinct yrtermcode from " + tablename + " where  SUBSTRING(examname,1,1)=? and enrollno=? and examcode like '"+courseCode+"%'", [semester,enrollment], (err, result) => {
                        console.log(err);
                        // if()
                        conn.release();
                        if (err) reject(err);
                        else resolve(result);
                    });

                }
            });
        });
        return p;
    }
    searchStudyCenterDetailByCode(code,session) {
        let n = session.split("-");
        let tablename = "college_" + n[0].toLowerCase() + "_" + n[1];
        // console.log(tablename);
        // console.log(code);

        let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let tablename= await courseService.getCourseNameByCode(courseCode);
                    // let tablename = "college_" + session;
                    //  console.log("table name=>",tablename);
                    //  console.log("request name=>",courseCode);
                    //  console.log("request name=>",enrollment);

                    // conn.query("select distinct yrtermcode from "+tablename+" where enrollno=?",[enrollment], (err, result) => {
                    conn.query("select code,`COLLEGE / CENTER NAME`,address,city,dist from " + tablename + " where code=?", [code], (err, result) => {
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
    searchConsolidateResult(data) 
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let tablename= await courseService.getCourseNameByCode(courseCode);
                    // let tablename = "college_" + session;
                    //  console.log("table name=>",tablename);
                    //  console.log("request name=>",courseCode);
                    //  console.log("request name=>",enrollment);
                    let tablename="course_media";
                    if(data.coursecode == 14 || data.coursecode ==16 || data.coursecode ==17)
                    {
                        tablename = "course_" + data.coursecode;

                    }
                    // tablename = "course_" + data.coursecode;
                    // conn.query("select distinct yrtermcode from "+tablename+" where enrollno=?",[enrollment], (err, result) => {
                    conn.query("SELECT DISTINCT semobt,semoutof,semresult,examcode2,SGPA,yrtermcode,agrtotobtn,agrtotout,CGPA,agrpercent,agrdiv,withheld,remark1,remark2  from "+tablename+" WHERE enrollno=? and semresult='PASS' ORDER by examcode2;", [data.envno], (err, result) => {
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
    searchCourseEnrollment(data)
    {
        let p = new Promise((resolve, reject) => {
            connection.getConnection(async (err, conn) => {
                // console.log(err);
                if (err) reject(err);
                else {
                    // let tablename= await courseService.getCourseNameByCode(data.coursecode);
                    let tablename = "course_" + data.coursecode;
                    // let n = data.session_name.split("-");
                    // let tablename2 = "college_" + n[0].toLowerCase() + "_" + n[1];
                    // let sem=data.sem;

                    // let 
                    // console.log(tablename);

                    // console.log(tablename2);

                    let sql = "SELECT A.*,B.* FROM " + tablename + " as A LEFT JOIN subject_code_master  as B on a.subcode=B.SUBJE where A.enrollno=? order by A.yrtermcode";
                    // let sql = "SELECT A.rollno,A.name,A.fhname,A.mname,A.enrollno,A.subcode,A.paper,A.thobt,A.thoutof,A.thresult,A.threvised,A.probt,A.proutof,A.prresult,A.prrevised,A.intobt,A.intoutof,A.intresult,A.intrevised,A.subresult,A.sub_total,A.sub_max,A.sub_min,A.sub_credit,A.sub_grade_point,A.sub_credit_point,A.sub_grade,A.semobt,A.semoutof,A.semresult,A.status,A.medium,A.category,A.msheetno,A.stdcent,A.examcent,A.semoutof,A.sub_max,A.sub_min,A.sub_grade,A.sub_grade_point,A.CGPA,A.SGPA,A.sub_total,A.total_credit,A.total_credit_point,B.`COLLEGE / CENTER NAME`,B.city,B.dist FROM " + tablename + " as A LEFT JOIN " + tablename2 + " as B on A.examcent=B.code where A.enrollno=? and A.yrtermcode=?";
                    // let sql=`SELECT ${tablename}.rollno,${tablename}.name,${tablename}.fhname,${tablename}.mname,${tablename}.enrollno,${tablename}.status,${tablename}.medium,${tablename}.category,${tablename}.msheetno,${tablename}.stdcent,${tablename}.examcent,${tablename}.semoutof,${tablename}.sub_max,${tablename}.sub_min,${tablename}.sub_grade,${tablename}.sub_grade_point,${tablename}.CGPA,${tablename}.SGPA,${tablename}.sub_total,${tablename}.total_credit,${tablename}.total_credit_point,"${tablename2}".'COLLEGE / CENTER NAME',${tablename2}.city,${tablename2}.dist FROM ${tablename} LEFT JOIN ${tablename2} on ${tablename}.examcent=${tablename2}.code where ${tablename}.enrollno=? and ${tablename}.yrtermcode=?`;
                    // conn.query("select *from "+tablename+" where enrollno=? and yrtermcode=?",[data.envno,data.session_name], (err, result) => {
                    // console.log(sql);
                    conn.query(sql, [data.envno], (err, result) => {
                     //   console.log(err, result.length);
                    //    let res = result.reduce((r, { yrtermcode: name, ...object }) => {
                    //         var temp = r.find(o => o.name === name);
                    //         if (!temp) r.push(temp = { name, children: [] });
                    //         temp.children.push(object);
                    //         return r;
                    //     }, []);
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