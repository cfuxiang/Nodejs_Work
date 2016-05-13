var fs = require("fs");
var zlib = require('zlib');

// Compress the file blockingIO.txt to blockingIO.txt.gz
fs.createReadStream('blockingIO.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('blockingIO.txt.gz'));
  
console.log("File Compressed.");