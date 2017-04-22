/**
 * Created by modestanil on 21/4/17.
 */
"use strict";
const MIN_VALUE = new Date(-8640000000000000);
const MAX_VALUE = new Date(8640000000000000);
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


//var CustomDate =
module.exports =  {


    getMonthName(month) {
        return month_names[month];
    },

    getMonthNameShort(month) {
        return month_names_short[month];
    },

    areSameDate(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )
    },

    formatDate(stringDate) {
        "use strict";
        if(stringDate === undefined || stringDate === '' || stringDate === null || stringDate.length === 0)
            return MIN_VALUE
        return new Date(stringDate)
    }
}

