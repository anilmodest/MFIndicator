var Fund = require('../models/fundSchema')
var NavSchema = require('../models/NavSchema')
var fundParser = require('../components/fundInfoParser')
var navInfoParser = require('../components/navInfoParser')
module.exports = function(app) {

    app.get('/', function (req, res) {
        res.json({message: 'hello world'})


    })

    app.post('/admin/uploadfunds', function(req, res) {
        "use strict";
        fundParser.fundParser(req.body.csvFilePath)
        res.json('Async Upload triggered: call listFunds to list all registered funds')
    })

    app.get('/query/listFunds', function(req, res) {
        "use strict";

        Fund.find().getAllFunds().exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/admin/listAllNavs', function(req, res) {
        "use strict";

        NavSchema.find().getAllFundNavs().exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/query/navbycode', function(req, res) {
        "use strict";

        NavSchema.find().byCode(req.query.code).exec(function(err, data) {
            res.json(JSON.stringify(data))
        })
    })

    app.get('/testMongo', function (req, res) {
        /*var fund = new Fund({
         name: 'testMF',
         category: 'equity',
         desc: 'test',
         nav: 100.2,
         historicalNav: { date: new Date(), nav: 98.5},
         createdOn: new Date()
         })
         fund.save(function(err) {
         "use strict";
         if(err) {
         console.log('error saving the document: ' + err)
         }
         console.log('document saved')
         })*/

        Fund.find().byName('testMF').exec(function(err, f) {
            "use strict";
            if(err) {
                console.log('error finding the record: ' + err)
            }
            console.log('found ${f.length} matching records')
            res.json(JSON.stringify(f))
        })


    })

    app.get('/admin/updateNav', function(req, res){
        "use strict";
        navInfoParser.updateNav(req.query.fromDate, req.query.toDate, res)
    })
}
