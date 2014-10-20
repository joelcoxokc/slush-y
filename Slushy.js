(function(){
  'use strict';

      var util           = require('util');
      var path           = require('path');
      var Utility        = require('./src/util');
      var Q              = require('q');
      var _              = require('lodash');
      var Storage        = require('./src/storage.js');
      var BaseController = require('./src/BaseController.js');
      var gulp           = require('gulp');
      var Promise        = require("bluebird");
      var log            = console.log

      Promise.promisifyAll(_);


      var Slushy = module.exports = (function() {
        'use strict';

        var $ = this;

        /**
         * Slushy Class. A configuration binding frame work for slush
         * @param {Object} tasks [A collection of gulp tasks]
         */
        function Slushy(plugins) {

          BaseController.apply(this, arguments);

          if (!(this instanceof Slushy)) {
            return new Slushy(args);
          }

        }

        util.inherits(Slushy, BaseController);

        Slushy.prototype.register = function(tasks) {
          var $ = this;
          console.log('inside register', _.functions(this));
          _(tasks).forEach(function (data, key){

            $.i('Incoming tasks ' + $.err(key))

            var callback = require( data )($);

          })

        };
        Slushy.prototype.initialize = function(options) {
          return this.initConfig(optins);
        };

        return Slushy;

      }());


})()