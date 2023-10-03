const winston = require("winston");
require("dotenv").config();
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
module.exports=logger;