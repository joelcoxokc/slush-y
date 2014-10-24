;(function(){
    'use strict';

    var Slush_y = require('./src/class/Slush_y.class.js');
    var _       = require('lodash');
    var inquirer     = require('inquirer');
    var Q       = require('q');

    var slush_y = new Slush_y;
    var Slushy = module.exports = (function() {

      'use strict';

        var __this = this;
        var __stream = {
          configuration: configuration,
          defaults:      defaults,
          validate:      validate,
          register:      register,
          prompts:       prompts,
          siphon:        siphon,
          source:        source,
          flow:          flow,
          use:           use
        };

        return __stream;

        ////////////////////////

        function siphon(__Generator, options){
          var __Generator = __Generator || function(){};
          var options = options || {};

          return function (done){
            /**
             * Set options.generator equal to the context of the current gulp taks;
             * @type {Object};
             */
            options.generator = this;

            return __stream
                .flow( options )
                .then( __stream.validate )
                .then( __stream.defaults )
                .then( __stream.prompts )
                .then( __stream.configuration )
                .then( __stream.source )
                .then( __stream.use )
                .catch( done )
          }
        }
        function use ( options ) {

          // Calls Slush_y.use( options )
          return options.__Generator(options);
        }

        function flow ( options ) {

          // Calls Slush_y.flow( options ); and promises it's return value;
          var $promised = Q.defer();
          $promised.resolve( __this.flow(options) );
          return $promised.promise;
        }

        function validate ( options ) {
          return __this.validate( options );
        }
        function defaults (options) {

          // Calls Slush_y.defaults( options );
          return __this.defaults( options );
        }
        function prompts ( options ) {

          // Calls Slush_y.prompts( options )
          return __this.prompts( options );
        }
        function configuration ( options ) {

          // if(default) Slush_y.initConfig( options ) else Slush_y.setConfig( options )
          return __this.configuration( options );
        }
        function source( options ) {

          // Calls Slush_y.use( options )
          return __this.source( options );
        }

        function register(){

          return __this.register(__dirname);
        }

    }).call(slush_y);


}).call(this);

