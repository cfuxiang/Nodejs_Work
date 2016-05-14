var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var tmp = multer({ dest: '/tmp/'});

var user = {
		"user 4" : {
			"name" : "user 4",
			"password" : "password4",
			"profession" : "deputy director",
			"id": 4
		}
}

app.get('/addUser', function (req, res) {
	// First read existing users.
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		data["user 4"] = user["user 4"];
		console.log( data );
		res.end( JSON.stringify(data));
		//implement the appending of the new user into json
	});
})

app.get('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user " + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
       //implement the deletion of the record from json
   });
})

//somehow, routing based on :id needs to be the last service for the whole thing to work
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user " + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

//This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
	console.log("Got a GET request for the homepage");
	res.send('Hello GET');
})

//a new route
app.get('/process_get', function (req, res) {

	// Prepare output in JSON format
	response = {
			first_name:req.query.first_name,
			last_name:req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

//Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/process_post', urlencodedParser, function (req, res) {

	// Prepare output in JSON format
	response = {
			first_name:req.body.first_name,
			last_name:req.body.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {

	console.log(req.files.file.name);
	console.log(req.files.file.path);
	console.log(req.files.file.type);

	var file = __dirname + "/" + req.files.file.name;
	fs.readFile( req.files.file.path, function (err, data) {
		fs.writeFile(file, data, function (err) {
			if( err ){
				console.log( err );
			}else{
				response = {
						message:'File uploaded successfully',
						filename:req.files.file.name
				};
			}
			console.log( response );
			res.end( JSON.stringify( response ) );
		});
	});
})

//This responds a POST request for the homepage
app.post('/', function (req, res) {
	console.log("Got a POST request for the homepage");
	res.send('Hello POST');
})

//This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
	console.log("Got a DELETE request for /del_user");
	res.send('Hello DELETE');
})

//This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
	console.log("Got a GET request for /list_user");
	res.send('Page Listing');
})

//This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
	console.log("Got a GET request for /ab*cd");
	res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)

})
