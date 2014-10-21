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

      function BaseController(){

        Utility.apply(this, arguments);
        this.clientDir      = path.join('./', 'client');
        this.appDir         = path.join('./', 'client', 'app');
        this.coreDir        = path.join('./', 'client','app', 'core');
        this.moduleDir      = path.join('./', 'client','app', 'modules');
        this.util           = Utility;
        this.appName        = 'Slush-y';
        this.generators     = {};


      }


      util.inherits(BaseController, Utility)

      BaseController.prototype.findModules      = function (){
        var promised = Q.defer();
        readModules();
        promised.resolve( prompts, modulesFolder);

        return promised.promise;

        function readModules(){

            var stat = fs.statSync(modulesFolder + '/' + folder);

            if (stat.isDirectory()) {
              prompts[0].choices.push({
                value: folder,
                name: folder
              });
            }
        }
      };


      BaseController.prototype.set = function(key, value){

        this.config.set(key, value);
      }


      BaseController.prototype.get = function(key){

        if(key){
          return this.config.get(key);
        }
        return this.config.getAll();
      }


      BaseController.prototype.store = function(options){
        var self = this;
        _(options).forEach(function (value, key){

          self.config.set(key, value);

        })
      }

      BaseController.prototype.use = function(functionToUse){
        var args = Array.prototype.slice.call(arguments);
        args.shift()
        functionToUse.apply(this, args);
      }

      BaseController.prototype.initConfig = function( options ){
          this.config         = new Storage(options.appName,  '.sl-y.json');
          var $q = Q.defer();

          /**
           * Store defaults into configuration before retrieval;
           */
          this.store(defaults);

          var config = this.get();
          this.info('Initializing Configuration from BaseController')
          config = this.makeStrings(config, config.appName);
          console.log('Your Current Configurations = ', defaults);


          config.clientDir = './client'; config.serverDir = './server';
          config.appDir = './server'; config.js = true; config.script = 'js'; config.auth = true; config.http = true; config.restangular = false; config.httpType = 'http';
          config.modulesDir = './client/app/modules';
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

      BaseController.prototype.ask = function(prompts) {
        var $ = this;
        this.info('Prompting from BaseController')
        var promised = Q.defer();
        inquirer.prompt(prompts, function (answers){
            console.log('Answers from inside BasController============================', answers)

            $.initConfig(answers)
              .then(function (options){
                promised.resolve(options)
              });
        })
        return promised.promise;

      };

      BaseController.prototype.register = function(){

      }

      BaseController.prototype.processFile  = function (bool, file){
        if(!bool){
          if (file.basename.indexOf('__') == 0) {
            file.basename = '.' + file.basename.slice(2);
          }
        }
        return file;
      };
      BaseController.prototype.processTemplate  = function (bool, file){}
      //////////////

      module.exports = BaseController



})();