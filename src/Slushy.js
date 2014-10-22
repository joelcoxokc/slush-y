(function(){
  'use strict';

      var util           = require('util');
      var path           = require('path');
      var Utility        = require('./util');
      var Q              = require('q');
      var _              = require('../lodash.mixins.js');
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
          this.tasks = {};

          this.normalize = function(dest){
            return path.join(__dirname+'', this.root, dest);
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
            $.tasks[key] = $.normalize(destination);
            $.log('Registering ['+$.blue('sub-generator')+']:' + $.blue( key ))
            require( $.normalize(destination) ).apply($, $.args);
          })
        };

        Slushy.prototype.initialize = function(options) {
          return this.initConfig(options);
        };


        Slushy.prototype.use = function(callback){

          var $ = this;


          return function(done){
            var task = $.isRunning(this.tasks);
            task.path = $.tasks[task.name];
            // task.path =
            if(!this.args[0]){
              $.nameError(this.seq[0]);
              return done();
            }
            var options = { ref: 'name', name: this.args[0], task:task };

            callback.apply($, [done, options]);
          }
        }

        Slushy.prototype.generate = function(callback){
          var $ = this;
          return function(options){

            options.templateDir = $.tasks[options.task.name]+'templates';
            if(options.moduleName === 'core'){
              options.modulesDir  = $.config.get('appDir');
            } else {
              options.modulesDir  = $.config.get('modulesDir');
            }

            if(options.task.name !== 'module' && options.task.name !== 'crud'){
              options.moduleDir = $.path(options.modulesDir, options.moduleName);
            } else {
              options.moduleDir = $.path(options.modulesDir, options.slugName);
            }
            callback.apply($, [options]);
          }
        }

        Slushy.prototype.named = function(callback){

          return function(done){
            console.log(this.args);
          }
        }

        Slushy.prototype.isRunning = function(args){
          var generator = _(args).filter(function (value){ return value.running && value.running !== undefined }).value()[0];
          this.log('Running  ['+this.blueB('sub-generator')+']:' + this.blueB( generator.name ));
          return generator;
        }

        return Slushy;

      }());


})()