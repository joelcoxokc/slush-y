(function(){
  'use strict';

    /*
     *
     *  Express Application Server
     *
     *  **************************
     */


    /**
     * NODE_ENV
     * @type {Node Environment}
     */
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var express     = require('express');
    var mongoose    = require('mongoose');
    var config      = require('./config/environment');
    var mongoSeeds  = require('./config/seed');



    /**
     * Connect to Mongoose
     */
    mongoose.connect(config.mongo.uri, config.mongo.options);


    /**
     * Main Express App....
     * @type {Object}
     */
    var app = express();
    var server = require('http').createServer(app);

    /**
     * Populate the DB with seed data
     */
    if(config.seedDB) { mongoSeeds(); }

    /**
     * Initialize Socket.io
     */
    var socketio = require('socket.io')(server, {
      serveClient: (config.env === 'production') ? false : true,
      path: '/socket.io-client'
    });


    /**
     * Register API ENDPOINTS with socket.io
     * Configure express.
     * Register API ENDPOINT RESTFUL Routing.
     */
    require('./config/socketio')(socketio);
    require('./config/express')(app);
    require('./routes')(app);


    /**
     * Run Server!
     */
    server.listen(config.port, config.ip, function () {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });

    /**
     * Expose the Node Application.
     */
    exports = module.exports = app;
    /////////////////////////////////////////////////////


})();