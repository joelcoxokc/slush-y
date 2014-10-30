;(function(){

  'use strict';

    var _ = require('lodash')

    var Configuration;

    Configuration = module.exports = Configuration;

    function Configuration( ) {

      var _this = this;

      var config = {}
          config.initialize  = initialize;
          config.base        = base;
          config.filter      = filter;
          config.options     = options;

      /**
       * Return Public api for service;
       */
      return config;


      /**
       * initialize       Main application configuration
       *                  set default config store values.
       *                  The initialize function will be invoked for you.
       *                  Everything else from the file must be invoke yourself.
       * @param  {Object} answers  Answers from initail prompting.
       * @return {Object} return Storage for usage later;
       */
      function initialize (stream) {

          var storage = _this.storage.get();
              storage[stream.answers.script] = true;
              storage[stream.answers.httpType] = true;
              _.assign(storage, stream.answers)
              storage.app_names = _this.str().simple(storage.appName);

              storage.restangular = false;

          _this.storage.store( storage );

          stream.filters = storage;
          return stream;
      }

      /**
       * [filter description]
       * @return {[type]} [description]
       */
      function filter(){}

      /**
       * [generators description]
       * @return {[type]} [description]
       */
      function base() {}

      /**
       * [subGenerators description]
       * @return {[type]} [description]
       */
      function options() {}

    }

}).call(this);







