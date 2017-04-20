/**
 * Created by modestanil on 20/4/17.
 */
/**
 * Created by modestanil on 11/1/17.
 */
var mongoose = require('mongoose')
require('mongoose-double')(mongoose)
var utils = require('../utils/utils')
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema

var navSchema = new Schema({
    code: {type: String, required: true, index: true},
    isin: {type: String, index: true},
    isinreinvest: {type: String},
    schemeName: {type: String},
    nav: {type: SchemaTypes.Double, required: true},
    repurchasePrice: {type: SchemaTypes.Double, required: true},
    salePrice: {type: SchemaTypes.Double, required: true},
    date:Date,
    category:{type: String},
    createdOn: {type:Date, default:new Date().getDate()}
});

navSchema.query.byCode = function(code) {
    "use strict";
    return this.find({code : new RegExp(code, 'i')})
}

navSchema.query.getAllFundNavs = function() {
    "use strict";
    return this.find()
}

var NavSchema = mongoose.model('NavSchema', navSchema)

module.exports = NavSchema
