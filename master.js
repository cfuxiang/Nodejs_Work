const fs = require('fs');
const child_process = require('child_process');

//using exec (synchronised)
for(var i=0; i<3; i++) {
	var workerProcess = child_process.exec('node childProcess.js '+i,
			function (error, stdout, stderr) {
		if (error) {
			console.log(error.stack);
			console.log('Error code: '+error.code);
			console.log('Signal received: '+error.signal);
		}
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
	});

	workerProcess.on('exit', function (code) {
		console.log('Execed child process exited with exit code '+code);
	});
}

//using spawn
for(var i=0; i<3; i++) {
	//you can also use fork!
	var workerProcess = child_process.spawn('node', ['childProcess.js', i]);

	workerProcess.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	workerProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	workerProcess.on('close', function (code) {
		console.log('Spawned child process exited with code ' + code);
	});
}

//using fork
for(var i=0; i<3; i++) {
	var worker_process = child_process.fork("childProcess.js", [i]);	

	worker_process.on('close', function (code) {
		console.log('Forked child process exited with code ' + code);
	});
}