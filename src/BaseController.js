(function(){
  'use strict';

      var util      = require('util');
      var path      = require('path');
      var Utility   = require('./util');
      var Q         = require('q');
      var _         = require('lodash');
      var Storage   = require('./storage.js');
      var gulp      = require('gulp');
      var inquirer  = require('inquirer');
      var $         = require('gulp-load-plugins')({lazy:false});
      var prompts   = require('../config/prompts');
      var GulpProto = require('gulp').Gulp;
      var defaults  = require('./defaults');
      var chalk     = require('chalk');
      var _         = require('lodash');
      var ___       = require('underscore.string');
      var fs        = require('fs');

      function BaseController(){

        Utility.apply(this, arguments);


        this.config          = new Storage('S-Y.JSON',  '.sl-y.json')
        this._templateDir    = path.join(__dirname, '/templates');
        this._templates      = this.templatesDir + '/**/*';
        this._clientDir      = path.join('./', 'client');
        this._appDir         = path.join('./', 'client', 'app');
        this._coreDir        = path.join('./', 'client','app', 'core');
        this._moduleDir      = path.join('./', 'client','app', 'modules');
        this.util            = Utility;
        this.appName         = 'Slush-y';
        this.generators      = {};

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
        return this.confing.getAll();
      }


      BaseController.prototype.store = function(options){
        var self = this;
        _(options).forEach(function (key, value){

          self.config.set(key, value);

        })
      }


      BaseController.prototype.initConfig = function( options ){

          var $q = Q.defer();


          var config = this.get();
          config = this.makeStrings(condig, config.appName);


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

      BaseController.prototype.register = function(){

      }

      BaseController.prototype.processTemplate  = function (){};

      //////////////

      module.exports = BaseController



})();
