const mysql2=require("mysql2");
require("dotenv").config();
const hostname=process.env.MYSQL_HOST;
const username=process.env.MYSQL_USERNAME;
const pwd=process.env.MYSQL_PASSWORD;
const db=process.env.MYSQL_DATABASE;

const conn=mysql2.createPool({
    host:hostname,
    user:username,
    password:pwd,
    database:db,
    // multipleStatements: true   // <------

    // host:"localhost",
    // user:"root",
    // password:"giit",
    // database:"giit"
});     
// conn.connect((error)=>{
//     // console.log(process.env.MYSQL_HOST);
//     // console.log(process.env.MYSQL_USERNAME);
//     // console.log(process.env.MYSQL_PASSWORD);
//     // console.log(process.env.MYSQL_DATABASE);


//     if(error) throw error;
//     // else console.log("connected");
// });

module.exports=conn;