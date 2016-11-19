var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/finhacks');

//route configuration
var front_end = require('./routes/front_end');
var user_routes = require('./routes/user_routes');

var app = express();

//app config
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.static(__dirname + './../app/'));

app.use(function(req,res,next){
    req.db = db;
    next();
});

//set Routes
app.use('/', front_end);
app.use('/api/users',user_routes);

app.listen(8000,function(){
	console.log('Listening on http://localhost:8000');
	console.log('Stop Server With CTRL + C');
});