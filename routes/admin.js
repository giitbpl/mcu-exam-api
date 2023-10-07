const express = require("express");
const route = express.Router();
// const conn=require("../db/connection");
const hash = require("../utilites/Hashing");
const crypto = require('crypto');
const adminservice = require("../services/AdminService");
// const classTransformer = require('class-transformer');
const UserModel = require("../models/UserModel");
const jwt = require("../services/JwtToken");

route.post('/login', (req, res) => {
    let user = req.body.email;
    let pwd = req.body.pwd;
    adminservice.login(user, pwd).then(result => {
        console.log("user found=>", result);
        let token = jwt.getNewToken({ "email": req.body.email }, process.env.JWT_SECRET_TOKEN);

        res.status(200).json({
            "error": "false",
            "token": token,
            "role": result[0].role,
            "message": "success"

        });
    }).catch(err => {
        console.log("error: ", err);
        res.status(200).json({
            "error": "true",
            "message": err
            // "data":result

        });
    });

});
route.post('/hash', (req, res) => {
    // console.log(req.body);
    hash.hashPassword(req.body.pwd).then((pwd) => {
        res.status(200).json({
            "error": "false",
            "hash": pwd,
            "message": 'success'
        });
    }).catch(err => {
        // console.log(err);
        res.status(200).json({
            "error": "true",
            // "hash":pwd,
            "message": err
        });
    });

});
route.post('/returnhash', (req, res) => {
    // console.log(req.body);
    hash.comparePassword(req.body.pwd, req.body.hash).then((pwd) => {
        res.status(200).json({
            "error": "false",
            "hash": pwd
        });
    });

});
route.post('/register', (req, res) => {
    console.log(req.body);
    adminservice.register(req.body).then((response) => {
        res.json({
            "error": "false",
            "data": response
        });
    }).catch((err) => {
        // console.log("error==>",err);
        if (err.sqlMessage.search("user.macaddress") > 0) {
            res.json({
                "error": "true",
                "message": "duplicate Mac Address"
                // "data":response
            });
        } else  if (err.sqlMessage.search("user.ipaddress") > 0) {
            res.json({
                "error": "true",
                "message": "duplicate Ip IP Address"
                // "data":response
            });
        }
    });
    // adminservice.getUserByEmail(req.body.email).then(data=>{
    //     res.json({
    //         "error":"true",
    //         "message":"email is already register"
    //     });

    // }).catch(err=>{
    //     adminservice.getUserByIpAddress(req.body.ipAddress).then(d=>{
    //         console.log("data=",d);

    //         res.json({
    //             "error":"true",
    //             "message":"ip address is already register"
    //         });
    //     }).catch(err=>{

    //         console.log("err",err);
    //         adminservice.getUserByMacaddress(req.body.macAddress).then(macaddress=>{
    //             console.log(macaddress);
    //             res.json({
    //                 "error":"true",
    //                 "message":"mac address is already register"
    //             });
    //         }).catch(err=>{
    //             adminservice.register(req.body).then((response) =>{
    //                 res.json({
    //                     "error":"false",
    //                     "data":response
    //                 });
    //             }).catch((err) =>{
    //                 console.log("error==>",err);
    //                 res.json({
    //                     "error":"true",
    //                     "message":err
    //                     // "data":response
    //                 });
    //             });
    //         });

    //     });

    // });
    // const user = classTransformer.plainToInstance (UserModel, req.body);



});
route.get('/alluser', (req, res) => {
    // console.log(req.body);
    // const user = classTransformer.plainToClass(UserModel, req.body);
    adminservice.getAllUsers().then((response) => {
        res.json({
            "error": "false",
            "data": response,
            "message": "success"
        });
    }).catch((err) => {

        res.json({
            "error": "true",
            // "data":response
            "message": err
        });
    });


});
route.get('/getuserbyuid/:uid', (req, res) => {
    adminservice.getUserByUid(req.params.uid).then(response => {
        res.json({
            "error": "false",
            "data": response,
            "message": "success"
        });
    }).catch(error => {
        res.json({
            "error": "true",
            // "data":response
            "message": err
        });
    });
});

module.exports = route;