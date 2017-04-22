/**
 * Created by modestanil on 22/4/17.
 */
var mongoose = require('mongoose')
var utils = require('../utils/utils')

var Schema = mongoose.Schema

var navLookup = new Schema({
    navDate: {type: Date, required: true, index: true},
    createdOn: {type:Date, default: new Date().getDate()}
});

navLookup.query.byDate = function(inputDate) {
    "use strict";
    return this.find({$and : [{"$lte": inputDate}, {"$gte" : inputDate}]})
}

var NavLookup = mongoose.model('NavLookup', navSchema)

module.exports = NavLookup
