/**
 * Created by modestanil on 20/4/17.
 */

var http = require('http')
var NavSchema = require('../models/NavSchema')
var util = require('../utils/utils')


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
                        /*
                         code: {type: String, required: true, index: true},
                         isin: {type: String, index: true},
                         isinreinvest: {type: String},
                         schemeName: {type: String},
                         nav: {type: Number, required: true},
                         repurchasePrice: {type: Number, required: true},
                         salePrice: {type: Number, required: true},
                         date:Date,
                         category:{type: String},
                         createdOn: {type:Date, default:new Date().getDate()}*/

                        code: values[0],
                        schemeName: values[1],
                        nav: util.getFloat(values[2]),
                        repurchasePrice: util.getFloat(values[3]),
                        salePrice: util.getFloat(values[4]),
                        date: util.getDate(values[5])

                    })

                    navSchema.save(function(err) {
                        "use strict";
                        if(err) {
                            console.log('error saving the row: ' + err.message)
                            return
                        }
                        console.log('nav saved')
                    })
                }
            });

            response.on('error', function (err) {
                console.log('error getting response' + err.message);
            });


        }
        http.request(options, callback).end();
        return res.json('method fired')
    }


}
