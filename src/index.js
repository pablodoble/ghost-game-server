var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");

// Config
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