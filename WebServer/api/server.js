var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/finhacks');

//app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));

//route configuration
var front_end = require('./routes/front_end');
var user_routes = require('./routes/user_routes');

app.use(function(req,res,next){
    req.db = db;
    next();
});

//set Routes
app.use('/', front_end);
app.use('/api/users',user_routes);

app.listen(8080,function(){
	console.log('Listening on http://localhost:8080');
	console.log('Stop Server With CTRL + C');
});