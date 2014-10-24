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
      var Craller     = require('./craller.class');
      /**
       * Helers
       */
      var Storage     = require('../lib/storage.service');
      var defaults    = require('../lib/defaults.service');
      var Controller  = require('../lib/Slush_y.controller');

      var Slush_y = module.exports =  function Slush_y (){

        Controller.apply( this, arguments );

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
      };

      /**
       * Inherit helper.prototype from ../lib/helper.controller
       */
      util.inherits( Slush_y, Controller );

      /**
       * Extend any required prototypes
       */
      _.extend(Slush_y.prototype, require('inquirer'));
      _.extend(Slush_y.prototype, require('../lib/config.service'));
      // _.extend(Slush_y.prototype, require('./craller.class'));



      /**
       * Slush_y.startValidationi:  sets options.current to the current tasks name.
       *                            if options.current is 'default' then set options.default to true.
       *                            We will use the default param later to run speecific tasks.
       * @param  {Object}   options [Initial Options param]
       * @return {Object}   options The streamed object;
       */
      Slush_y.prototype.startValidation   = function ( options ) {
        var __this = this;

        if(options.current === 'default'){
          options.default = true;
        }
        options.reset = true;
        if(__this.get('appName')){
          return __this.askToReset(options)
            .then(function (options) {
              return options;
            })
        }
        return options;
      };

      /*
       * Initialize the promise chain and pass in the initial options.
       * set options.name === to the current running generator's' name.
       * set the path to the generator === relative path from the root to generators/<generator.name>/index.js
       * set the stream_callback === to a function that will apply the context of slushy to the call back, and pass in the options object;
       * set the templatPath = the generators path + './templates/'
       */
      Slush_y.prototype.startFlow         = function ( options ) {
          var __this = this;

          options.application     = {};
          options.answers         = {};
          options.prompts         = [];
          options.config          = {};
          options.__Generator     = function(){};
          options.current         = options.generator.seq[0];
          console.log('optoijsdifl')
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
        options.generator.path  = __this.__generatorsPath + options.generator.name;
        options.prompts         = require(options.generator.path + '/prompts');

        options.__Generator     = __this.bindGenerator(options.generator.path);
        // console.log()
        options.templates       = options.generator.path + '/templates';


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

        __this.prompt(options.prompts, function (answers){

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

        if( options.default && options.reset){
          __this.__config         =  new Storage('.sl-y.json');
          __this.__config.set('__appName',    __this.__appName);
          __this.__config.set('__appDir',     __this.__appDir);
          __this.__config.set('__rootDir',    __this.__rootDir);
          __this.__config.set('__coreDir',    __this.__coreDir);
          __this.__config.set('__clientDir',  __this.__clientDir);
          __this.__config.set('__serverDir',  __this.__serverDir);
          __this.__config.set('__modulesDir', __this.__modulesDir);
          __this.__config.set('defaults', __this.__defaults);
          options = __this.initConfig( options );
        }
        return options
      };

      /**
       * [source this will create ans add all source and destinatino path selectios for the generator to do it's job.]
       * @param  {Object}   options   [Options should contain the same informatino as before, as we did not modify it in configuration]
       * @return {Promise}            [Return a promise for the next chain]
       */
      Slush_y.prototype.startSource        = function ( options ) {
        var __this = this;

        options.src = src;

        return options;

        function src(pattern){
          return path.join(options.templates, pattern );
        }

      };

      Slush_y.prototype.registration = function ( ) {

        return this.register;
      };

}).call(this);
