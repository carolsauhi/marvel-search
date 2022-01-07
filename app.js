//-----------------------+Start code for APP+-------------------------------
require("dotenv").config({
    "silent": true
});
  
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");
var cors = require('cors');
const http = require('https');
  
app.use(cors());
app.use(cookieParser());
  
app.use(require("express-session")({
    "secret": process.env.APP_SECRET,
    "saveUninitialized": true,
    "resave": true
}));
  
app.use(bodyParser.json())
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
  
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
  
//---------------------------------------------------------------------------
  
app.use(express.static(__dirname + '/client'));

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port http://localhost:"+port);
});
  
//start server on the specified port and biding host
// var port = process.env.APP_PORT || 8000
// app.listen(port, function() {
// console.log("To view your app, open this link in your browser: http://localhost:" + port);
// });
  