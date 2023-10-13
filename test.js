// 
const fs = require('fs');
//  Since Node.js v0.12 and as of Node.js v4.0.0, there is a stable
// readline core module. That's the easiest way to read lines from a file,
// without any external modules. Credits: https://stackoverflow.com/a/32599033/1333836
const readline = require('readline');

const lineReader = readline.createInterface({
    input: fs.createReadStream('./logs/access.json')
});

const realJSON = [];
lineReader.on('line', function (line) {
  // console.log(JSON.parse(line));
  try
  {
    realJSON.push(JSON.parse(line));

  }
  catch (e) {
    console.log(e);
  }
});
console.log(realJSON);