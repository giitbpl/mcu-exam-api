// var crypto = require('crypto');
// const hash =require("./utilites/Hashing");
// // console.log(crypto.randomBytes(20).toString('hex'));
// // var mykey = crypto.createCipher('aes-128-cbc', '12345');
// // var mystr = mykey.update('abc', 'utf8', 'hex')
// // mystr += mykey.final('hex');

// // console.log(mystr); //2840ea2695f2d14bb614c1c09c3906c3
// let password = "12345";
// let salt = "5f53123e2c05711180d3698d0d93a227af5ac929";
// hash.hashPassword(password+salt).then((hashPassword=>{
//         console.log(hashPassword);
// }));
// var crypto = require('crypto');
// //creating hash object 
// var hash = crypto.createHash('sha512');
// //passing the data to be hashed
// data = hash.update('12345', 'utf-8');
// //Creating the hash in the required format
// gen_hash= data.digest('hex');
// //Printing the output on the console
// console.log("hash : " + gen_hash);
// const reader = require('xlsx')
  
// // Reading our test file
// const file = reader.readFile('D:/mcu-data/file_example_XLS_5000.xlsx');
// const [columns] = reader.utils.sheet_to_json(file.Sheets["Sheet1"], { header: 1 });
// console.log(columns);
// let data = []
  
// const sheets = file.SheetNames
//   console.log(sheets);
// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//         console.log(temp.length);
//    temp.forEach((res) => {
//       data.push(res)
//    })
// }
  
// // Printing data
// console.log(data[0]['First Name']);

const NodeCache = require("node-cache");
const myCache = new NodeCache();
console.log(myCache.getStats());