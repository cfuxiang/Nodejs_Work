var fs = require("fs");

var data = fs.readFileSync('blockingIO.txt');

console.log(data.toString());
console.log("Program Ended");