;(function(){
    'use strict';

      /**
       * Plugins
       * @type {Node Modules}
       */
      var Q           = require('q');
      var _           = require('lodash');
      var path        = require('path');
      var util        = require('util');
      var inquirer    = require('inquirer');
      var Files       = require('../controllers/file.controller');
      /**
       * Helers
       */
      var Storage     = require('../lib/storage.service');
      var defaults    = require('../lib/defaults.service');
      var Controller  = require('../controllers/Slush_y.controller');
      var Utility     = require('../utility/Utility.class');

      var templateGenerator = require('../utility/templateGenerator.js');
      var subGenerators = require('../utility/subGenerators.js');

      var Slush_y = module.exports =  function Slush_y (){

        Utility.apply( this, arguments );
        // Utility.apply( this, arguments );

        var __this = this;

        __this.__generatorsPath = path.join( __dirname +'', '../../generators/' );
        __this.__generators     = {};
        __this.__config         =  new Storage('.sl-y.json');
        __this.__rootDir        = path.join(__dirname+'', '../../');
        __this.__modulesDir     = path.join('./client/app/modules');
        __this.__coreDir        = path.join('./client/app/core');
        __this.__appDir         = path.join('./client/app');
        __this.__serverDir      = path.join('./server');
        __this.__clientDir      = path.join('./client');
        __this.__appName        = defaults.appName;
        __this.__defaults       = defaults;

        __this.__opts           = ['templates', 'prompts', 'answers', 'settings', '__Generator', 'generator'];
        __this.__subGeneratos   = subGenerators;
      };

      /**
       * Inherit helper.prototype from ../lib/helper.controller
       */
      util.inherits( Slush_y, Utility );
      // util.inherits( Slush_y, Utility );

      /**
       * Extend any required prototypes
       */
      _.extend(Slush_y.prototype, require('inquirer'));
      _.extend(Slush_y.prototype, require('../lib/config.service'));
      // _.extend(Slush_y.prototype, require('../utility/Utility.class'));
      _.extend(Slush_y.prototype, require('../controllers/Slush_y.controller'));
      _.extend(Slush_y.prototype, require('../controllers/file.controller.js') )
      // _.extend(Slush_y.prototype, require('./craller.class'));

      /*
       * Initialize the promise chain and pass in the initial options.
       * set options.name === to the current running generator's' name.
       * set the path to the generator === relative path from the root to generators/<generator.name>/index.js
       * set the stream_callback === to a function that will apply the context of slushy to the call back, and pass in the options object;
       * set the templatPath = the generators path + './templates/'
       */
      Slush_y.prototype.startFlow         = function ( options ) {
          var __this = this;

          _.forEach(__this.__opts, function ( key, item){
            if (_.isEmpty(key) || options[key] === undefined){
              return options[key] = {}
            }
            return options[key] = options[key];
          });

          options.__Generator      = function(){};
          return options;
      };

      /**
       * Slush_y.startValidationi:  sets options.current to the current tasks name.
       *                            if options.current is 'default' then set options.default to true.
       *                            We will use the default param later to run speecific tasks.
       * @param  {Object}   options [Initial Options param]
       * @return {Object}   options The streamed object;
       */
      Slush_y.prototype.startValidation   = function ( options ) {
          var __this = this;


          if(options.generator.seq[0] === 'default'){
            if(!_.size( options.settings )) { options.settings = {}; }
            options.settings.default = true;
            options.settings.reset = true;

            if(__this.get('appName')){

              return __this.requestReset(options)
                .then(function (options) {
                  return options;
                })
            } else {

              return options;

            }
          } else if( !options.generator.args[0] ){
            __this.nameError( options.generator.seq[0] );
            return options.doneCallback();
          }

          return options;
      };

      /**
       * [defaults Check if the generator is running default, if so, initialize configuration after prompt]
       * @param  {Object}   options   [options object, this object is modified every step until the end.]
       * @return {Promise}            [returns a promise to pick up on the next chain]
       */
      Slush_y.prototype.startDefaults      = function ( options ) {
          var __this = this;


          options.generator.name  = options.generator.seq[0];
          // console.log(__this.templateGn)


          options.__Generator     = __this.bindGenerator(options.generator.path);
          options.templates.root  = options.generator.path + '/templates';

          return options;
      };

      /**
       * [prompts prompt th user using inquire]
       * @param  {Object}   options   [options should contain a property {prompts} a list of prompts to pass into inquire]
       * @return {Promise}            [Return a promise for the next chain]
       */
      Slush_y.prototype.startPrompts       = function ( options ) {
          var __this = this;

          var $promised = Q.defer();

          __this.prompt(options.generator.prompts, function (answers){

              _.assign(options.answers, answers);
              $promised.resolve(options);
          });

          return $promised.promise;
          // return options.prompts = ' -- start prompts endpoint reached';
      };
      /**
       * [Configuration Initialize the config store if this is a new instance, otherwise, ignore and pass throguh]
       * @param  {Object}   options   [options should now contain a property call {answers} a list of all the users choices]
       * @return {Promise}            [return a promise for the next chain]
       */
      Slush_y.prototype.startConfiguration = function ( options ) {
          var __this = this;

          if( options.settings.default && options.settings.reset){
            options = __this.initConfig( options );
          }
          return options;
      };


      /**
       * Slush_y.createFilters will generate filters and paths for the developer to use while building out the generator.
       * @param  {Object} options [Initial Streamed options object]
       * @return {Object}         [return Initial Streamed options object]
       */
      Slush_y.prototype.createFilters = function( options ){

          var __this = this;
          if( options.settings.default ){
           options = __this.generateDefaultFilters( options );
          } else {
           options = __this.generateFilters( options );
          }
          return options;
      }

      /**
       * createPaths Create paths for source and destinations
       * @param  {Object} options Original Steam options.
       * @return {Object}         return a modified version of the options with the appropriate paths.
       */
      Slush_y.prototype.createPaths  = function ( options ) {
          var __this = this;
          options.templates = options.generator.createTemplates( options.filters.httpType );
          options = __this.generatePaths( options );
          return options;
      };

      /**
       * [source this will create ans add all source and destinatino path selectios for the generator to do it's job.]
       * @param  {Object}   options   [Options should contain the same informatino as before, as we did not modify it in configuration]
       * @return {Promise}            [Return a promise for the next chain]
       */
      Slush_y.prototype.startSource        = function ( options ) {
          var __this = this;
          if( options.settings.default ) {
            options = __this.generateTemplates( options );
          }

          return options;
      };

      Slush_y.prototype.registration = function ( ) {

          return this.register;
      };

}).call(this);
