const express=require("express");
const route=express.Router();
// const conn=require("../db/connection");
const hash =require("../utilites/Hashing");
const crypto = require('crypto');
const adminservice=require("../services/AdminService");
// const classTransformer = require('class-transformer');
const  UserModel  = require("../models/UserModel");

route.post('/login',(req,res) =>{
        let user = req.body.email;
        let pwd = req.body.pwd;
        adminservice.login(user,pwd).then(result=>{
            console.log("user found=>",result);
            res.status(200).json({
                "error":"false",
                "data":result,
                "message":"success"

            });
        }).catch(err=>{
            // console.log("error: " , err);
            res.status(200).json({
                "error":"true",
                "message":err
                // "data":result

            });
        });
        
});
route.post('/hash',(req,res) =>{
    // console.log(req.body);
       hash.hashPassword(req.body.pwd).then((pwd)=>{
        res.status(200).json({
            "error":"false",
            "hash":pwd,
            "message":'success'
           });
       }).catch(err=>{
        // console.log(err);
        res.status(200).json({
            "error":"true",
            // "hash":pwd,
            "message":err
           });
       });
       
});
route.post('/returnhash',(req,res) =>{
    // console.log(req.body);
       hash.comparePassword(req.body.pwd,req.body.hash).then((pwd)=>{
        res.status(200).json({
            "error":"false",
            "hash":pwd
           });
       });
       
});
route.post('/register',(req,res) =>{
    // console.log(req.body);
    // const user = classTransformer.plainToInstance (UserModel, req.body);
    adminservice.register(req.body).then((response) =>{
        res.json({
            "error":"false",
            "data":response
        });
    }).catch((error) =>{
        res.json({
            "error":"true",
            "message":err
            // "data":response
        });
    });
      
       
});
route.get('/alluser',(req,res) =>{
    // console.log(req.body);
    // const user = classTransformer.plainToClass(UserModel, req.body);
    adminservice.getAllUsers().then((response) =>{
        res.json({
            "error":"false",
            "data":response,
            "message":"success"
        });
    }).catch((err) =>{
       
        res.json({
            "error":"true",
            // "data":response
            "message":err
        });
    });
      
       
});

module.exports=route;