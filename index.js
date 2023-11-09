const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const fs = require("fs");
// var requestIp = require('request-ip');
const fileUpload = require('express-fileupload');
// const logger = require("./lib/logger");
const JwtToken = require('./services/JwtToken');
const adminservice = require('./services/AdminService');
// var morgan = require('morgan');
// const { stream } = require('winston');
// const json = require('morgan-json');
const logservice = require("./services/logService");
// const { error } = require('console');
// const pino = require('pino-http')()


dotenv.config();
// app.use(cors({
//     origin: "*"
// }));
app.use(require("cors")());
app.use(fileUpload());
app.use(express.json());
// morgan.token('ip', function (req, res) { return req.ip })
// morgan.token('uid', function (req, res) {
    // console.log("auth=>", req.headers.authorization);
    // if (req.headers.authorization != undefined && req.headers.authorization.length > 0) {
    //     token = JwtToken.verify(req.headers.authorization, process.env.JWT_SECRET_TOKEN);
    //     return token.uid;

    // }
    // else {
    //     return 0;
    // }
// })
// const format = json({
//     method: ':method',
//     url: ":url",
//     status: ":status",
//     ip: ":ip",
//     uid: ":uid",
//     // length: ':res[content-length]',
//     // 'response-time': ':response-time ms'
// });

// app.use(morgan(format, {
//     stream: fs.createWriteStream('./logs/access.log', { flags: 'a' })

// }));



// app.use((req, res, next) => {
//     let validip=false;
//     adminservice.getallIpAddress().then(ipaddress => {
//         console.log("request id=",req.ip);
//         ipaddress.forEach(element => {
//                 console.log(element);
//                 if(element.ipaddress == req.ip) {
//                     validip=true;
//                   return;
//                 }

//         });
//         if(validip==false) {
//             res.json({
//                 "error": "true",
//                 "message": "ip address of this pc is not registered",
//                 "code": "1001" //ip address is not registered
//             });
//             // return;
//         }
//         else
//         {
//             next();
//         }
//     }).catch((err) => {
//         console.log(err);
//     });

// });

app.use(function (req, res, next) {
    // let token = "";
    // console.log("ip=>", req.headers['x-forwarded-for']);
    // console.log(req.url);
    console.log(req.headers.authorization);
    let token = "";
    // // console.log("header=>", req.headers.authorization.length != 0);
    if(req.headers.authorization==undefined) {
        res.status(400).send("Invalid request");
        let output = {
            "method": req.method,
            "url": req.url,
            "ip": (req.ip==undefined)?req.headers['x-forwarded-for']:req.ip,
            "uid": (token === "") ? 0 : token.uid,
            "status": res.statusCode,
        };
        // logger.info(output);
        // console.log(requestIp.getClientIp(req));
        logservice.save(output).then(function (response) {
            // console.log("save", response);
        }).catch(err => {
            console.log("error=>", err);
        });
        return
    }
    if (req.headers.authorization.length > 6) {
        // if (typeof bearerHeader !== 'undefined') {
        let reqtoken = req.headers.authorization.split(" ");
          console.log("request token", reqtoken);
        token = JwtToken.verify(reqtoken[1], process.env.JWT_SECRET_TOKEN);
        console.log("t=>",token);
        adminservice.getUserByUid(token.uid).then(data=>{
            req.body.uid = token.uid;
            // req.body.email = token.email;
            // console.log(data);
            let output = {
                "method": req.method,
                "url": req.url,
                "ip": (req.ip==undefined)?req.headers['x-forwarded-for']:req.ip,
                "uid": (token === "") ? 0 : token.uid,
                "status": res.statusCode,
            };
            // logger.info(output);
            // console.log(requestIp.getClientIp(req));
            logservice.save(output).then(function (response) {
                // console.log("save", response);
            }).catch(err => {
                console.log("error=>", err);
            });
            next();
        }).catch(err=>{
            // console.log(err);
            res.json({
                "error": "true",
                "message":"invalid request"
            });
            // return;
        });
    }
    else if (req.headers.authorization.length == 6  && req.url=="/admin/login")
    {
        console.log(res.statusCode);
        let output = {
            "method": req.method,
            "url": req.url,
            "ip": (req.ip==undefined)?req.headers['x-forwarded-for']:req.ip,
            "uid": (token === "") ? 0 : token.uid,
            "status": res.statusCode,
        };
        // logger.info(output);
        // console.log(requestIp.getClientIp(req));
        logservice.save(output).then(function (response) {
            // console.log("save", response);
        }).catch(err => {
            console.log("error=>", err);
        });
        next();
    }
    else
    {
        res.json({
            "error": "true",
            "message": "invalid request",
            
        });
    }




    // next();
});

app.listen(process.env.PORT, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log("running =" + process.env.PORT);
    let output = {
        "error": "server error",
        "message": "server restarted"
    };
    // logger.error(output);
    // If current directory does not exist
    // then create it
    // fs.mkdir(path, (error) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("New Directory created successfully !!");
    //     }
    // });


});
app.use("/admin", require("./routes/admin"));
app.use("/import", require("./routes/import"));
app.use("/export", require("./routes/export"));
app.use("/logs", require("./routes/logs"));
app.use("/restore", require("./routes/restore"));
app.use("/search", require("./routes/search"));
app.use("/course", require("./routes/course"));
app.use("/college", require("./routes/college"));
// app.use("/subject", require("./routes/subject"));

app.get('/', (req, res) => {
    res.json({
        "error": "true",
        "message": "hello",
        "testings": "testings"
    });
    // var i = 1,
    //     max = 5;

    // //set the appropriate HTTP header
    // res.setHeader('Content-Type', 'text/html');

    // //send multiple responses to the client
    // for (; i <= max; i++) {
    //     res.write('<h1>This is the response #: ' + i + '</h1>');
    // }

    // //end the response process
    // res.end();
});
app.post("/divide", (req, res) => {
    try {

        let a = req.body.a;
        let b = req.body.b;
        // if (b == 0) throw new Error("Invalid")
        let c = parseInt(a) / parseInt(b);
        res.json({
            "answer": c
        });
    }
    catch (err) {
        res.json({
            "answer": 0
        });
    }



});
