// Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Create server at port 8080
var server = app.listen(8080, function() {
	console.log('Listening at port 8080...');
});

// Create path to the public folder
app.use(express.static(__dirname + '/public'));

// Send index.html to client
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// Receive data from client
app.post('/submit', urlencodedParser, function(req, res) {
	// Get data from client
	var data = req.body;
	var name = data.name;
	var comment = data.comment;

	// Read data from JSON file
	fs.readFile('comments.json', (err, data) => {
		if (err) throw err;
		var json = JSON.parse(data);

		// Add new data to JSON file
		json.push({
			name: name,
			comment: comment
		});

		// Write data to JSON file
		fs.writeFile('comments.json', JSON.stringify(json), (err) => {
			if (err) throw err;
			console.log('Data saved!');
		});
	});
});

// Send data to client
app.get('/data', function(req, res) {
	// Read data from JSON file
	fs.readFile('comments.json', (err, data) => {
		if (err) throw err;
		var json = JSON.parse(data);
		res.send(json);
	});
});