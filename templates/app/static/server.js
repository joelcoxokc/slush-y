'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
  config = require('./config/config'),
  mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Expose app
module.exports = app;

// When mongoose connects...
mongoose.connection.on('open', function(ref) {
  console.log('Connected to mongo server');

  // ...Start the app by listening on <port>...
  app.listen(config.port, function() {
    //... application now started
    console.log('Application started on port ' + config.port);
  });
});

mongoose.connection.on('error', function(err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
