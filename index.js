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
const serverService = require("./services/AdminService");

dotenv.config();
// app.use(cors({
//     origin: "*"
// }));
app.use(require("cors")());
app.use(fileUpload());
app.use(express.json());

app.use((req,res,next) => {
    // console.log(req.body);
    // console.log(req.url.search("/macaddresscheck"));
    if(req.url.search("/macaddresscheck")>=0)
    {
        console.log(req.query);
        adminservice.getUserByMacaddress(req.query.macaddress).then(data=>{
            res.json({
                "error": "false",
                "message": "Mac Address found"
                // "data":response
            });
        }).catch((error) => {
            res.json({
                "error": "true",
                "message": " Mac Address not found"
                // "data":response
            });
        });
    }
    else
    {
        next();

    }
});

app.use(function (req, res, next) {
    // let token = "";
    // console.log("ip=>", req.headers['x-forwarded-for']);
    // console.log(req.url);
    // console.log(req.headers.authorization);
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
        //   console.log("request token", reqtoken);
        token = JwtToken.verify(reqtoken[1], process.env.JWT_SECRET_TOKEN);
        // console.log("t=>",token);
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
        // console.log(res.statusCode);
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

let server=app.listen(process.env.PORT, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log("running =" + process.env.PORT);
    serverService.serverStart().then(() => {}).catch((err) => {
        console.log("error =" + err);
    });
    // let output = {
    //     "error": "server error",
    //     "message": "server restarted"
    // };
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
server.close((err) => {
    console.log("closed");
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
        "error": "false",
        "message": "true",
        // "testings": "testings"
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
