(function(){
  'use strict';

      var util           = require('util');
      var path           = require('path');
      var Utility        = require('./util');
      var Q              = require('q');
      var _              = require('lodash');
      var Storage        = require('./storage.js');
      var BaseController = require('./BaseController.js');
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
            console.log('Creating a new instance of - ' + this.blue('Slushy'));
            return new Slushy(args);
          }
          this.log('using an instance of - [' + this.blue('Slushy')+']');
          this.root = '../'

          this.normalize = function(dest){
            return path.join(this.root, dest);
          }
        }

        util.inherits(Slushy, BaseController);

        Slushy.prototype.registerPlugins = function(){
          var $ = this;
          $.args = arguments;
        }
        Slushy.prototype.registerGenerators = function(tasks) {
          var $ = this;
          _(tasks).forEach(function (destination, key){
            $.log('Incoming tasks ' + $.blue( key ))
            require( $.normalize(destination) ).apply($, $.args);
          })
        };

        Slushy.prototype.initialize = function(options) {
          return this.initConfig(options);
        };

        return Slushy;

      }());


})()