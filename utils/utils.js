/**
 * Created by modestanil on 11/1/17.
 */

const locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }}

String.prototype.format = function()
{
    var content = this;
    for (var i=0; i < arguments.length; i++)
    {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};

module.exports = {
    createGuid: function ()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    getDate: function(stringDate) {
        "use strict";
        if(stringDate === undefined || stringDate === '' || stringDate === null || stringDate.length === 0)
            return MIN_VALUE
        return new Date(stringDate)
    },

    getNumber : function(strNumber) {
        "use strict";
        if(strNumber === undefined || strNumber === null || strNumber === '' || strNumber.length === 0 || strNumber === NaN)
            return 0
        return parseInt(strNumber) || 0
    },

    getFloat : function(strNumber) {
        "use strict";
        if(strNumber === undefined || strNumber === null || strNumber === '' || strNumber.length === 0 || strNumber === NaN)
            return 0
        return parseFloat(strNumber) || 0
    },

    getFormattedDate : function(day, mon, year) {
        "use strict";
        var date = '{0}-{1}-{2}'.format(day, mon, year)
        return date
    }


}