;(function(){
    'use strict';

      var Q         = require('q');
      var _         = require('lodash');
      var _str      = require('underscore.string');
      var path      = require('path');
      var inflect   = require('inflection');

      var Controller = module.exports;

      /////////////////////



      Controller.isRunning = function(args){
        var generator = _(args).filter(function (value){ return value.running && value.running !== undefined }).value()[0];
        return generator;
      };

      Controller.bindGenerator = function(path) {
        var __this = this;

        return function (){

           var args = Array.prototype.slice.call(arguments);
          require(path).apply(__this, args)
        }
      };


      /**
       * [askToReset description]
       * @param  {[type]} options [description]
       * @return {[type]}         [description]
       */
      Controller.requestReset = function( options ) {

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
       * Controller.generatePaths grabs all the default paths, and Templates, and stores them on config,
       * also sets options.paths === the generated paths;
       * @param  {Object} options [Initial streamed options]
       * @return {Object}         [return the streamed options]
       */
      Controller.generatePaths = function ( __options ) {

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

          if(__options.generator.type === 'angular') {
            __options.paths.dest = path.join( paths.modulesDir,  __options.filters.moduleNames.slug);
          }

          return __options;
      };

      /**
       * Generate Filters for templating;
       * @param  {[type]} __options [description]
       * @return {[type]}           [description]
       */
      Controller.generateFilters = function ( __options ) {
        var __this = this;

        var filters = __this.get('filters');

        if( __options.generator.category === 'client'){
          filters = __this.str(__options.answers.moduleName, 'moduleNames', filters).simple();
        }
        if( __options.generator.title){
          filters = __this.str( __options.generator.title, 'names', filters ).multi();
        }
        filters.answers = __options.answers;

        __options.filters = filters;
        return __options;

      }

      /**
       * Controller.generateFilters will set all the answers chosen from prompts on options.filters, and config.filters;
       * @param  {[type]} __options [description]
       * @return {[type]}           [description]
       */
      Controller.generateDefaultFilters = function ( __options ) {

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

          config.filters     = filters;
          __options.filters = filters;
          __this.store( config );
          return __options;
      };

      Controller.generateTemplates = function ( __options ) {

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