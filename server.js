/**
 * Created by modestanil on 11/1/17.
 */

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/env/dev')
const fs = require('fs')
const path = require('path')
var join = require('join').Join

const models = path.join(__dirname, 'models')
console.log(models)

var port = process.env.PORT || 8081;


//var connection =
connect()
var app = express()
module.exports = {
    app

}

require('./config/express')(app)
require('./config/routes/routes')(app, mongoose)
require('./config/routes/admin/adminroutes')(app, mongoose)
require('./config/routes/query/queryroutes')(app, mongoose)
require('./config/routes/triggers/triggerroutes')(app, mongoose)


// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.indexOf('.js'))
    .forEach(file => require(path.join(models, file))(mongoose));




listen()



function listen() {
    console.log('starting express server...')
    app.listen(port)
    console.log('express app started at port: ', port)
}

function connect() {
    console.log('connecting mongodb : ' + config.db)
    var options = {server: {socketOptions: {keepAlive: 1}, reconnectTries: 3 } }
    //var connection = mongoose.connect(config.db, options).connection
    mongoose.promise = global.Promise
    mongoose.connect(config.db, options)
    console.log('connected')
    //return connection
}




















