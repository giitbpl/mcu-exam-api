const Jwt = require("jsonwebtoken");
// const user = require("./user");
require("dotenv").config();
class JwtToken {
    getNewToken(username, secretkey) {
        let JwtToken = Jwt.sign(username, secretkey);
        //  ,(err,token)=>{
        //     if(err) throw err;
        //     else
        //     JwtToken=token;
        // });
        return JwtToken;
    }
    verify(token, secretkey) {
        return Jwt.verify(token, secretkey);
        
    }
}
module.exports = new JwtToken();