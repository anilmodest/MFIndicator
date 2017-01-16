/**
 * Created by modestanil on 11/1/17.
 */
var mongoose = require('mongoose')
var utils = require('../utils/utils')

var Schema = mongoose.Schema

var fund = new Schema({
    id: {type: String, defaultValue: utils.createGuid()},
    name: String,
    category: {type: String, required: true},
    desc: String,
    nav: {type: Number, required: true},
    historicalNav: [{
        date:Date,
        nav: Number
    }],
    createdOn: {type:Date, default:new Date().getDate()}
})

fund.query.byName = function(name) {
    "use strict";
    return this.find({name : new RegExp(name, 'i')})
}

var Fund = mongoose.model('Fund', fund)

module.exports = Fund