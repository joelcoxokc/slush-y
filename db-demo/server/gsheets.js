var gsheets = require('google-sheets');

// authorize your account
gsheets.auth({
    email: 'joelcox@hisimagination.com',
    password: '091190dev'
}, function(err) {
    if (err) {
        throw err;
    }
        // list spreadsheets in the account
        gsheets.list(function(err, sheets) {
            // sheets is an array of Spreadsheet objects
            console.log(sheets)
        });
});