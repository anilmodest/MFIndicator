/**
 * Created by modestanil on 11/1/17.
 */
var mongoose = require('mongoose')
var utils = require('../utils/utils')

var Schema = mongoose.Schema

var fund = new Schema({
    id: {type: String, defaultValue: utils.createGuid()},
    AMC: String,
    code: {type: String, required: true},
    schemeName: {type: String, required: true, index: true},
    type: {type: String, required: true},
    category: {type: String},
    navSchemeName: {type: String},
    minAmount: {type: Number},
    launchDate: {type: Date},
    closureDate: {type: Date},
    closureFlag: {type: String},
    loadFactor:  {type: String},
    isin: {type: String, index: true},
    createdOn: {type:Date, default:new Date().getDate()}
});

fund.index({code:1, type:1, category:1}, {unique: true})

fund.query.byName = function(name) {
    "use strict";
    return this.find({schemeName: new RegExp(name, 'i')})
};

fund.query.byNameAndCode = function(name, type) {
    "use strict";
    return this.find({$and: [{schemeName: new RegExp(name, 'i')}, {type: new RegExp(type, 'i')}]})
};

fund.query.byCode = function(code) {
    "use strict";
    return this.find({code : new RegExp(code, 'i')})
};

fund.query.byIsin= function(isin) {
    "use strict";
    return this.find({isin : new RegExp(isin, 'i')})
};

fund.query.byType = function(type) {
    "use strict";
    return this.find({type : new RegExp(type, 'i')})
};

fund.query.byNavName = function(name) {
    "use strict";
    return this.find({navSchemeName : new RegExp('^'+name+'$', 'i')})
};

fund.query.getAllFunds = function() {
    "use strict";
    return this.find();
}

var Fund = mongoose.model('Fund', fund)

module.exports = Fund