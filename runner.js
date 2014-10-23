;(function(){
    'use strict';

    var Slush_y = require('./slushy/Slush_y.class.js');
    var _       = require('lodash');
    var Q       = require('q');

    var slush_y = new Slush_y;
    var Slushy = module.exports = (function() {

      'use strict';
        var __this = this;
        var __instance = {
          configuration: configuration,
          defaults:      defaults,
          register:      register,
          prompts:       prompts,
          siphon:        siphon,
          source:        source,
          flow:          flow,
          use:           use
        };

        return __instance;

        ////////////////////////

        function siphon(options, __Generator){

          return function (done){

            __instance
                .flow( options )
                .then( __instance.defaults( options ))
                .then( __instance.prompts( options ))
                .then( __instance.configuration( options ))
                .then( __instance.source( options ))
                .then( __instance.use(  __Generator, options ))
                .catch( done )
          }
        }
        function use ( callback, options ) {
          // console.log('using ', callback, options)
          return callback.call(__this, options); // Calls Slush_y.use( options )
        }

        function validate () {
          var $promised = Q.defer();
          // Calls Slush_y.defaults( options )
          $promised.resolve(__this.validate( options ))
          return $promised.promise;
        }

        function flow ( options ) {
          var $promised = Q.defer();
          // Calls Slush_y.defaults( options )
          $promised.resolve(__this.flow( options ))
          return $promised.promise;
        }
        function defaults ( options ) {
          // Calls Slush_y.defaults( options )
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



  // console.log(Slushy.flow('starting flow'));
  // console.log(Slushy.defaults('starting defaults'));
  // console.log(Slushy.prompts('starting prompts'));
  // console.log(Slushy.configuration('starting configuration'));
  // console.log(Slushy.source('starting source'));






}).call(this);

