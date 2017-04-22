/**
 * Created by modestanil on 20/4/17.
 */

var http = require('http')
var NavSchema = require('../models/NavSchema')
var NavLookup = require('../models/navlookupSchema')
var util = require('../utils/utils')
var dateExtn = require('../utils/dateextension')

//http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?frmdt=18-Apr-2017&todt=18-Apr-2017
module.exports = {

    updateNav: function(fromDate, toDate, res) {
        "use strict";

        var options = {
            host: 'portal.amfiindia.com',
            path: '/DownloadNAVHistoryReport_Po.aspx?frmdt=' + fromDate + '&todt=' + toDate
        };

        var callback = function (response) {
            var str = '';
            var rowNum = 0;
            var headers = []

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                console.log('chunk recieved')
                str += chunk;
            });

            response.on('end', function () {
                //console.log('nav download ended' + str);
                var lines = str.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var values = lines[i].split(';')
                    console.log('row num:' + rowNum)
                    if(rowNum == 0) {
                        headers = values
                        rowNum = rowNum + 1;
                        continue
                    }
                    rowNum = rowNum + 1;
                    if(values.length < headers.length)
                        continue
                    //code here using lines[i] which will give you each line
                    console.log('parsing values: ' + values)
                    var navSchema = new NavSchema({
                        code: values[0],
                        schemeName: values[1],
                        nav: util.getFloat(values[2]),
                        repurchasePrice: util.getFloat(values[3]),
                        salePrice: util.getFloat(values[4]),
                        date: dateExtn.formatDate(values[5])
                    })

                    //NavLookup

                    navSchema.save(function(err) {
                        "use strict";
                        if(err) {
                            console.log('error saving the row: ' + err.message)
                            return
                        }
                        console.log('nav saved')
                    })
                }

                var navLookup = new NavLookup({
                    navDate: dateExtn.formatDate(values[5])
                })

                navLookup.save(function(err) {
                    if(err) {
                        console.log('error saving nav lookup table' + err.message)
                    }
                    console.log('nav lookup updated')
                })
            });

            response.on('error', function (err) {
                console.log('error getting response' + err.message);
            });


        }

        var isNavPresent = NavLookup.find().byDate(dateExtn.formatDate(values[5])).length > 0;
        if(isNavPresent) {
            console.log('Nav already updated for date. Skipping upload')
            return
        }
        http.request(options, callback).end();
        return
    }


}
