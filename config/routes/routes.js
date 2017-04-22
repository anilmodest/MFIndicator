var Fund = require('../../models/fundSchema')
var NavSchema = require('../../models/NavSchema')
var fundParser = require('../../components/fundInfoParser')
var navInfoParser = require('../../components/navInfoParser')
var util = require('../../utils/utils')
var dateExtn = require('../../utils/dateextension')
module.exports = function(app) {

    app.get('/', function (req, res) {
        res.json({message: 'hello world'})


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


}
