const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const fs = require("fs");
// var requestIp = require('request-ip');
const fileUpload = require('express-fileupload');
const logger = require("./lib/logger");
const JwtToken = require('./services/JwtToken');
const adminservice = require('./services/AdminService');
// const pino = require('pino-http')()


dotenv.config();
// app.use(cors({
//     origin: "*"
// }));
app.use(require("cors")());
app.use(fileUpload());
app.use(express.json());
// app.use(pino);
app.use((req, res, next) => {
    let validip=false;
    adminservice.getallIpAddress().then(ipaddress => {
        // console.log(ipaddress);
        ipaddress.forEach(element => {
                console.log(element);
                if(element.ipaddress == req.ip) {
                    validip=true;
                  return;
                }

        });
        if(validip==false) {
            res.json({
                "error": "true",
                "message": "ip address of this pc is not registered",
                "code": "1001" //ip address is not registered
            });
            // return;
        }
        else
        {
            next();
        }
    }).catch((err) => {
        console.log(err);
    });
   
});

app.use(function (req, res, next) {
    let token = "";
    console.log("header=>", req.headers.authorization.length != 0);
    if (req.headers.authorization.length != 0) {
        token = JwtToken.verify(req.headers.authorization, process.env.JWT_SECRET_TOKEN);

    }
    // console.log(token);
    // console.log("header=", req.headers.authorization === "");
    // JwtToken.
    let output = [{
        "method": req.method,
        "url": req.url,
        "ip": req.ip,
        "userid": (token === "") ? 0 : token.uid
    }];
    logger.info(output);
    // console.log(requestIp.getClientIp(req));
    next();
});

app.listen(process.env.PORT, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log("running =" + process.env.PORT);
    let output = {
        "error": "server error",
        "message": "server restarted"
    };
    logger.error(output);
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
