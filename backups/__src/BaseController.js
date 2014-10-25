(function(){
  'use strict';

      var util      = require('util');
      var path      = require('path');
      var Utility   = require('./util');
      var Q         = require('q');
      var Storage   = require('./storage.js');
      var gulp      = require('gulp');
      var inquirer  = require('inquirer');
      var $         = require('gulp-load-plugins')({lazy:false});
      var prompts   = require('../config/prompts');
      var defaults  = require('./defaults');
      var chalk     = require('chalk');
      var _         = require('lodash');
      var ___       = require('underscore.string');
      var fs        = require('fs');

      function Base(){

        Utility.apply(this, arguments);
        this.config         = new Storage('.sl-y.json');
        this.clientDir      = path.join('./', 'client');
        this.serverDir      = path.join('./', 'server');
        this.appDir         = path.join('./', 'client', 'app');
        this.coreDir        = path.join('./', 'client','app', 'core');
        this.moduleDir      = path.join('./', 'client','app', 'modules');
        this.util           = Utility;
        this.appName        = 'Slush-y';
        this.generators     = {};
        this.config.set('appName', this.appName);


      }


      util.inherits(Base, Utility)

      _.extend(Base.prototype, require('./lib/base.config'));
      _.extend(Base.prototype, require('./lib/actions'));

      Base.prototype.initConfig = function( options ){

          var $q = Q.defer();

          /**
           * Store defaults into configuration before retrieval;
           */
          // this.store(defaults);


          var config = this.get();
          config.appName = options.appName;
          this.info('Initializing Configuration from Base')
          config = this.makeStrings(config, config.appName);
          console.log('Your Current Configurations = ', defaults);


          config.clientDir = this.clientDir
          config.serverDir = this.serverDir
          config.appDir = this.appDir;
          config.modulesDir = this.moduleDir;
          config.js = true;
          config.script = 'js';
          config.auth = true;
          config.http = true;
          config.restangular = false;
          config.httpType = 'http';
          config.modules = [
            'core',
            'authentication',
            'administration',
            'generators'
          ];


          _(config.modules).forEach(function (item, key){
            config[key] = ___.contains(config.modules, key);
          })

          this.store(config);

          $q.resolve(this.get())
          return $q.promise;
      }

      Base.prototype.askDefault = function(prompts) {
        var $ = this;
        this.info('Prompting Default')
        var promised = Q.defer();
        inquirer.prompt(prompts, function (answers){
            // console.log('Answers from inside BasController============================', answers)

            $.initConfig(answers)
              .then(function (options){
                promised.resolve(options)
              });
        })
        return promised.promise;

      };

      Base.prototype.ask = function(prompts, options){
        var $ = this;
        var promised = Q.defer();
        this.info('Prompting', _.functions(inquirer))
        inquirer.prompt(prompts, function (answers){
            // console.log('Answers from inside BasController============================', answers)
            if(options.name){
              _.assign(options, answers);

              options = _.build(options)
            }
          console.log(answers)

            promised.resolve(options);
        })
        return promised.promise;

      }

      Base.prototype.processFile  = function (bool, file, options){
        if(!bool){
          if (file.basename.indexOf('__') == 0) {
            file.basename = '.' + file.basename.slice(2);
          }
        } else {
          if (file.basename.indexOf('_') == 0) {
            file.basename = file.basename.replace('_', options.slugName);
          }
        }
        return file;
      };



      Base.prototype.processTemplate  = function (bool, file){}
      //////////////

      module.exports = Base



})();