var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");

// Allowing cors
app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


// Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Routes
require('./routes/game.routes')(app);

// Http server
http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});