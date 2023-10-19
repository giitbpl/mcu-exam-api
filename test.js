// // 
// const fs = require('fs');
// //  Since Node.js v0.12 and as of Node.js v4.0.0, there is a stable
// // readline core module. That's the easiest way to read lines from a file,
// // without any external modules. Credits: https://stackoverflow.com/a/32599033/1333836
// const readline = require('readline');

// const lineReader = readline.createInterface({
//     input: fs.createReadStream('./logs/access.json')
// });

// const realJSON = [;
// lineReader.on('line', function (line) {
//   // console.log(JSON.parse(line));
//   try
//   {
//     realJSON.push(JSON.parse(line));

//   }
//   catch (e) {
//     console.log(e);
//   }
// });
// console.log(realJSON);
// const moment = require('moment');
// console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
var crypto = require('crypto');
const hash = require("./utilites/Hashing");
let password = "Ftp@1234";
let salt = "c7f3294e31afc17324e4d900a51a05f6035f80dc";
// let salt = crypto.randomBytes(20).toString('hex')
console.log(salt);
console.log(hash.hashPassword(password + salt));

// INSERT INTO`master_template`(`applicationno`, `enrollno`, `rollno`, `yrtermcode`, `examcode`, `examcode2`, `examname`, `examnamempo`, `progcodempo`, `stdcent`, `stdcentname`, `examcent`, `examcentname`, `pracent`, `pracentname`, `name`, `fhname`, `hname`, `mname`, `sex`, `status`, `category`, `medium`, `mstatus`, `dob`, `subcode`, `paper`, `thobt`, `thoutof`, `thresult`, `threvised`, `probt`, `proutof`, `prresult`, `prrevised`, `intobt`, `intoutof`, `intresult`, `intrevised`, `subresult`, `semobt`, `semoutof`, `semresult`, `sempercentage`, `semdivision`, `withheld`, `graceind`, `gracecurr`, `msheetno`, `agrtotobtn`, `agrtotout`, `agrresult`, `agrpercent`, `agrdiv`, `agrremark1`, `remark1`, `remark2`, `mappingfile`, `schemefile`, `studyfile`, `examfile`, `datafilefile`, `ID`) VALUES('?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?')

data['applicationno'], data['enrollno'],     data['rollno'],      data['yrtermcode'],
data['examcode'],      data['examcode2'],    data['examname'],    data['examnamempo'],
data['progcodempo'],   data['stdcent'],      data['stdcentname'], data['examcent'],
data['examcentname'],  data['pracent'],      data['pracentname'], data['name'],
data['fhname'],        data['hname'],        data['mname'],       data['sex'],
data['status'],        data['category'],     data['medium'],      data['mstatus'],
data['dob'],           data['subcode'],      data['paper'],       data['thobt'],
data['thoutof'],       data['thresult'],     data['threvised'],   data['probt'],
data['proutof'],       data['prresult'],     data['prrevised'],   data['intobt'],
data['intoutof'],      data['intresult'],    data['intrevised'],  data['subresult'],
data['semobt'],        data['semoutof'],     data['semresult'],   data['sempercentage'],
data['semdivision'],   data['withheld'],     data['graceind'],    data['gracecurr'],
data['msheetno'],      data['agrtotobtn'],   data['agrtotout'],   data['agrresult'],
data['agrpercent'],    data['agrdiv'],       data['agrremark1'],  data['remark1'],
data['remark2'],       data['mappingfile'],  data['schemefile'],  data['studyfile'],
data['examfile'],      data['datafilefile'], data['ID']
