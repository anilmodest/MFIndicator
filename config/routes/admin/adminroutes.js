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

    app.post('/admin/funds/upload', function(req, res) {
        "use strict";
        fundParser.fundParser(req.body.csvFilePath)
        res.json('Async Upload triggered: call listFunds to list all registered funds')
    })

    app.get('/admin/nav/updaterange', function(req, res){
        "use strict";
        var startDateStr = req.query.startDate;
        var endDateStr = req.query.endDate;
        var dt = new Date(endDateStr);
        var startDate = new Date(startDateStr);
        var currentDate = startDate;
        while(!dateExtn.areSameDate(currentDate, dt))
        {
            var date = util.getFormattedDate(currentDate.getDate(), dateExtn.getMonthNameShort(currentDate.getMonth()), currentDate.getFullYear());
            //var date = '{0}-{1}-{2}'.format(currentDate.getDate(), currentDate.getMonthNameShort('en'), currentDate.getFullYear());
            navInfoParser.updateNav(date, date, res);
            currentDate.setDate(currentDate.getDate() +1);
        }

        return res.json('NAV upload trigered for date range');

    })

    app.get('/admin/nav/updatemonthends', function(req, res){
        "use strict";
        var startYear = req.query.fromYear;
        var endYear = req.query.toYear;

        var currentDate = startDate;
        while(!dateExtn.areSameDate(currentDate, dt))
        {
            var date = util.getFormattedDate(currentDate.getDate(), dateExtn.getMonthNameShort(currentDate.getMonth()), currentDate.getFullYear());
            //var date = '{0}-{1}-{2}'.format(currentDate.getDate(), currentDate.getMonthNameShort('en'), currentDate.getFullYear());
            navInfoParser.updateNav(date, date, res);
            currentDate.setDate(currentDate.getDate() +1);
        }

        return res.json('NAV upload trigered for date range');

    })



}