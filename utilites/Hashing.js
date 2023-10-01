const bcrypt = require("bcrypt")
var crypto = require('crypto');
class Hasing {
      hashPassword(plaintextPassword) {
        // console.log(plaintextPassword);
        var hash = crypto.createHash('sha512');
       let data = hash.update(plaintextPassword, 'utf-8');
        let gen_hash= data.digest('hex');

        return   gen_hash;
        // Store hash in the database
    }

    // compare password
     comparePassword(plaintextPassword, hash) {
        const result =  bcrypt.compare(plaintextPassword, hash);
        return result;
    }
}
module.exports = new Hasing();