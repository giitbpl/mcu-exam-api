// const bcrypt = require("bcrypt")
// var crypto = require('crypto');
require('dotenv').config();
const fs=require('fs');
class FileUpload {
   upload(files)
   {
    let p =new Promise((resolve, reject) =>{
        // console.log(files); // the uploaded file object
        // console.log("error");
        let sampleFile;
        let uploadPath;
        if (!fs.existsSync(process.env.BACKUP_DIR)){
            fs.mkdirSync(process.env.BACKUP_DIR);
        }
        if (!files || Object.keys(files).length === 0) {
            // return res.status(400).json({
            //     "error": "true",
            //     "message": "no file selected for upload"
            // });
            reject("no file selected for upload");

        }
        sampleFile = files.file;
        uploadPath = process.env.BACKUP_DIR + '/' + sampleFile.name;
    
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function (err) {
            console.log("file upload error",err);
            if (err) {
                reject("file upload failed");
                // res.json({
                //     "error": "true",
                //     "message": "file not uploaded",
    
                // });
            }
            else {
    
                // res.json({
                //     "error": "false",
                //     "message": "file uploaded successfully",
    
                // });
                resolve("file uploaded successfully");
            }
        });
    });
    return p;
   }
}
module.exports = new FileUpload();