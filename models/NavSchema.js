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
    schemeName: {type: String, index : true},
    nav: {type: SchemaTypes.Double, required: true},
    repurchasePrice: {type: SchemaTypes.Double, required: true},
    salePrice: {type: SchemaTypes.Double, required: true},
    date: {type: Date, index: true},
    category:{type: String, index: true},
    createdOn: {type:Date, default:new Date().getDate()}
});

navSchema.query.byCode = function(code, inputDate) {
    "use strict";
    return this.find({date : {"$lte": inputDate, "$gte" : inputDate}}).find({code : new RegExp(code, 'i')})
}

navSchema.query.byCode = function(code) {
    "use strict";
    return this.find({code : new RegExp(code, 'i')})
}

navSchema.query.getAllFundNavs = function(inputDate) {
    "use strict";
    return this.find({date : {"$lte": inputDate, "$gte" : inputDate}})
}

navSchema.query.getNavByDate = function(isin, inputDate) {
    "use strict";
    return this.find({date : {"$lte": inputDate, "$gte" : inputDate}}).find({code : new RegExp(code, 'i')})
}

var NavSchema = mongoose.model('NavSchema', navSchema)

module.exports = NavSchema
