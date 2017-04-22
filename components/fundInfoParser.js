/**
 * Created by modestanil on 20/4/17.
 */
var fs = require('fs');
var parse = require('csv-parse');
var Scheme = require('../models/fundSchema')
var util = require('../utils/utils')
var dateExtn = require('../utils/dateextension')

var csvData=[];
var headers=[];
var rowNum = 0;
module.exports =  {
    fundParser : function(csvPath) {
        fs.createReadStream(csvPath)
            .pipe(parse({delimiter: ',', headers: true}))
            .on('data', function(csvrow) {
                console.log(csvrow);
                //do something with csvrow
                if(csvrow[0] === 'AMC')
                    return
                rowNum++;
                csvData.push(csvrow);
                var dateEx = new DateEx();
                var scheme = new Scheme({
                    /*id: {type: String, defaultValue: utils.createGuid()},
                     AMC: String,
                     code: {type: String, required: true},
                     schemeName: {type: String, required: true},
                     type: {type: String, required: true},
                     category: {type: String},
                     navSchemeName: {type: String},
                     minAmount: {type: Number},
                     launchDate: {type: Date},
                     closureDate: {type: Date},
                     closureFlag: {type: String},
                     loadFactor:  {type: Number},
                     isin: {type: String},
                     createdOn: {type:Date, default:new Date().getDate()}*/
                    AMC: csvrow[0],
                    code: csvrow[1],
                    schemeName: csvrow[2],
                    type: csvrow[3],
                    category: csvrow[4],
                    navSchemeName: csvrow[5],
                    minAmount: util.getNumber(csvrow[6]),
                    launchDate: dateExtn.formatDate(csvrow[7]),
                    closureDate: dateExtn.formatDate(csvrow[8]),
                    closureFlag: csvrow[9],
                    loadFactor: csvrow[10],
                    isin: csvrow[11]

                })

                scheme.save(function(err) {
                    "use strict";
                    if(err) {
                        console.log('error saving the row: ' + err.message)
                        return
                    }
                    console.log('fund saved')
                })
            })
            .on('end',function() {
                //do something wiht csvData
                console.log(csvData);
            })
            .on('error', function(err) {
                "use strict";
                console.log(err.message)
            });
    },

    results: function() {
        "use strict";
            return JSON.stringify(csvData)
    }
}