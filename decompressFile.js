var fs = require("fs");
var zlib = require('zlib');

// Decompress the file blockingIO.txt.gz to decompressed.txt
fs.createReadStream('blockingIO.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('decompressed.txt'));
  
console.log("File Decompressed.");