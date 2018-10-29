//reference: https://blog.vanila.io/setup-basic-server-with-express-framework-37b2ec749a6d
const express = require('express');
const port = 3000;
const app = express();

// SQLite
const sqlite3 = require('sqlite3').verbose();
// creating a database 
const db = new sqlite3.Database('./database.sqlite3');

// serves static files from a given directory
app.use('/static', express.static('./static'));

// prints Hello World at home
// no path after '/' will reference home
app.get('/', function (req, res) {
	res.send('<h1>Future HSPC Homepage!</h1>');
});


// listens for requests on the port
app.listen(port, function () {
	console.log("Server is running on " + port + " port");
});


