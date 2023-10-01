const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const fs = require("fs");
// var requestIp = require('request-ip');
const fileUpload = require('express-fileupload');

// const pino = require('pino-http')()
const winston = require("winston");
dotenv.config();
const path = process.env.LOG_DIR;
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: path + "/info.log", level: "info" }),
        new winston.transports.File({ filename: path + "/error.log", level: "error" }),

    ],
    format: winston.format.combine(
        // winston.format.timestamp({
        //     format: "dd-MM-yy HH:mm:ss"
        // }),
        winston.format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }), // adds a timestamp property
        winston.format.json()
    )
});
// app.use(cors({
//     origin: "*"
// }));
app.use(require("cors")());
app.use(fileUpload());

// app.use(pino);
app.use(function (req, res, next) {
    let output = {
        "method": req.method,
        "url": req.url,
        "ip": req.ip
    };
    logger.info(output);
    // console.log(requestIp.getClientIp(req));
    next();
});
app.use(express.json());
app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log("running =" + process.env.PORT);

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
app.get('/', (req, res) => {
    res.json({
        "error": "true",
        "message": "hello"
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