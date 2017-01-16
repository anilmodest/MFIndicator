var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
const config = require('./env/dev')
var mongoStore = require('connect-mongo')(session)

module.exports = function(app) {
    "use strict";

    app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
    app.use(bodyParser.json());
    app.use(allowCrossDomain);
    app.use('/api', express.Router());



    app.use(session({
        secret: 'test',
        proxy: true,
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({
            url: config.db,
            collection : 'sessions'
        })
    }));



}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}