/**
 * Think of Buffers as ByteArray or String/StringBuffer in Java :)
 */

//checking the # of octets in a buffer
buf = new Buffer(256);
len = buf.write("Buffers in nodejs!");
console.log("Octets written : "+  len);

//concatenating multiple buffers
var buffer1 = new Buffer('First ');
var buffer2 = new Buffer('Second');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());

//buffer comparison
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
	console.log(buffer1 +" comes before " + buffer2);
}else if(result == 0){
	console.log(buffer1 +" is same as " + buffer2);
}else {
	console.log(buffer1 +" comes after " + buffer2);
}

//copying buffer
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer(3); //declare the space inside the buffer
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

//slicing a buffer
var buffer1 = new Buffer('Think of it as charAt in Java!');
var buffer2 = buffer1.slice(0,9);
console.log("buffer2 content: " + buffer2.toString());

//get the length of the buffer
var buffer = new Buffer('Similar to getting the length of an array in Java!');
console.log("buffer length: " + buffer.length);






