var express = require('express');
var mongoose = require('mongoose');
var db = require('../db/config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var bodyParser = require("body-parser");



var app = express();

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server now listening on port ' + port);

require('./middleware.js')(app, express);

module.exports = app;