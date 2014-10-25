;(function(){
    'use strict';

      var Q         = require('q');
      var _         = require('lodash');
      var _str      = require('underscore.string');
      var path      = require('path');
      var inflect   = require('inflection');

      module.exports = Controller;

      /////////////////////

      function Controller (param) {

        var __this = this;

      }


      Controller.prototype.isRunning = function(args){
        var generator = _(args).filter(function (value){ return value.running && value.running !== undefined }).value()[0];
        return generator;
      };

      Controller.prototype.bindGenerator = function(path) {
        var __this = this;

        return function (){

           var args = Array.prototype.slice.call(arguments);
          require(path).apply(__this, args)
        }
      };

      /**
       * [str description]
       * @param  {[type]} string  [description]
       * @param  {[type]} ref     [description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      Controller.prototype.str = function(string, ref, options){
          var options   = options || {};
          var ref       = ref     || 'values';
          options[ref]  = {};
          options[ref].name = string;
          options = base(options);

          return {
            values: options,
            multi:multi
          }

          function base(options){
            options[ref].slug      = _str.slugify(_str.humanize(options[ref].name));
            options[ref].classed   = _str.classify(options[ref].slug);
            options[ref].humanized = _str.humanize(options[ref].slug);
            options[ref].camelized = _str.camelize(options[ref].slug);
            options[ref].humanized = _str.humanize(options[ref].name);
            return options;

          }
          function multi(){
            options[ref].slugPlural       = inflect.pluralize(options[ref].slug);
            options[ref].slugSingle       = inflect.singularize(options[ref].slug);
            options[ref].camelPlural      = _str.camelize(options[ref].slugPlural);
            options[ref].camelSingle      = _str.camelize(options[ref].slugSingle);
            options[ref].classedPlural    = _str.classify(options[ref].slugPlural);
            options[ref].classedSingle    = _str.classify(options[ref].slugSingle);
            options[ref].humanizedPlural  = _str.humanize(options[ref].slugPlural);
            options[ref].humanizedSingle  = _str.humanize(options[ref].slugSingle);
            return options;
          }
      }

      /**
       * [askToReset description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      Controller.prototype.askToReset = function( options ) {

        var __this = this;
        var $promised = Q.defer();
        var prompts = [{
          type: 'confirm',
          name: 'reset',
          message: 'Seems as though you already have current configuration in your .sl-y.json, Would you like to overwrite this?',
          default: true
        }]
        __this.prompt(prompts, function (answers){

          options.settings.reset = answers.reset;

          $promised.resolve( options );
        })
        return $promised.promise;
      };

      /**
       * [processFile description]
       * @param  {[type]} bool    [description]
       * @param  {[type]} file    [description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      Controller.prototype.processFile  = function (bool, file, options){
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

      /**
       * Controller.generatePaths grabs all the default paths, and Templates, and stores them on config,
       * also sets options.paths === the generated paths;
       * @param  {Object} options [Initial streamed options]
       * @return {Object}         [return the streamed options]
       */
      Controller.prototype.generatePaths = function ( __options ) {

          var __this       = this;
          var paths        = {};
          var config       = this.get();

          paths.appDir     = __this.__appDir;
          paths.rootDir    = __this.__rootDir
          paths.coreDir    = __this.__coreDir;
          paths.clientDir  = __this.__clientDir;
          paths.serverDir  = __this.__serverDir;
          paths.modulesDir = __this.__modulesDir;

          config.paths     = paths;
          __options.paths  = paths;
          __this.store( config );
          return __options;
      };

      /**
       * Controller.generateFilters will set all the answers chosen from prompts on options.filters, and config.filters;
       * @param  {[type]} __options [description]
       * @return {[type]}           [description]
       */
      Controller.prototype.generateFilters = function ( __options ) {

          var __this           = this;
          var filters          = {};
          var config           = __this.get();


          filters.httpType     = 'http';
          filters.script       = 'js';
          filters.styles       = 'css';


          _(filters).forEach(function (item, key){

            filters[item] = true;
          })

          // Overrides until cmplete
          filters.auth         = true;
          filters.restangular  = false;


          filters.modules = [
            'core',
            'authentication',
            'administration',
            'generators'
          ];

          filters.appName         = __options.answers.appName;
          filters.appAuthor       = __options.answers.appAuthor;
          filters.appKeywords     = __options.answers.appKeywords;
          filters.appDescription  = __options.answers.appDescription;

          filters.app_names       = config.app_names;

          config.filers     = filters;
          __options.filters = filters;
          __this.store( config );
          return __options;
      };

      Controller.prototype.generateTemplates = function ( __options ) {

          var __this    = this;
          var templates = __options.templates;

          __options.src = srcTemplates;


          return __options;

          function srcTemplates () {
            return {
              servers: serversPaths,
              static: staticPaths,
              clients: clientsPaths
            }
          }

          function serversPaths () {
            return path.join( templates.root, '/servers/**/*' );
          }

          function staticPaths ( ) {
            return path.join( templates.root, '/static/**/*' );
          }

          function clientsPaths ( ) {
            return {
              client: clientBase,
              options: clientOptions
            }
          }

          function clientBase ( ) {
            return path.join( templates.root, '/clients/client/**/*' );
          }
          function clientOptions ( option ) {
            return path.join( templates.root, '/client/options/', option, '/**/*' );
          }

      };

}).call(this);