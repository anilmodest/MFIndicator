/**
 * Created by modestanil on 22/4/17.
 */
var Fund = require('../../../models/fundSchema')
var NavSchema = require('../../../models/NavSchema')
var fundParser = require('../../../components/fundInfoParser')
var navInfoParser = require('../../../components/navInfoParser')
var util = require('../../../utils/utils')
var dateExtn = require('../../../utils/dateextension')

module.exports = function(app, mongoose) {
    "use strict";

    app.get('/funds/listall', function(req, res) {
        "use strict";

        Fund.find().getAllFunds().exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/funds/bytype', function(req, res) {
        "use strict";
        var fundType = req.query.fundType;
        Fund.find().byType(fundType).exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/funds/byname', function(req, res) {
        "use strict";
        var fundName = req.query.fundName;
        Fund.find().byName(fundName).exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/funds/bynameandcode', function(req, res) {
        "use strict";
        var fundName = req.query.fundName;
        var fundType = req.query.fundType;
        Fund.find().byNameAndCode(fundName, fundType).exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/nav/bycode', function(req, res) {
        "use strict";

        NavSchema.find().byCode(req.query.code).exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/nav/listall', function(req, res) {
        "use strict";

        NavSchema.find().getAllFundNavs().exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })
}