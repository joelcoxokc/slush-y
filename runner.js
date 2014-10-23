;(function(){
    'use strict';

    var Slush_y = require('./slushy/Slush_y.class.js');
    var _       = require('lodash');

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
          source:        source
        };

        return __instance;

        ////////////////////////

        function siphon(__Generator, options){

          return function (done){

            __instance
                .run(options)
                .then( __instance.use(  __instance.defaults      ))
                .then( __instance.use(  __instance.prompts       ))
                .then( __instance.use(  __instance.configuration ))
                .then( __instance.use(  __instance.source        ))
                .then( __instance.use(  __Generator              ))
                .catch( done )
          }
        }
        function use ( callback, options ) {

          return callback.apply(__instance, arguments); // Calls Slush_y.use( options )
        }

        function flow ( options ) {

          // Calls Slush_y.defaults( options )
          return Slush_y.flow( options );
        }
        function defaults ( options ) {

          // Calls Slush_y.defaults( options )
          return slush_y.defaults( options );
        }
        function prompts ( options ) {

          // Calls Slush_y.prompts( options )
          return Slush_y.prompts;
        }
        function configuration ( options ) {

          // if(default) Slush_y.initConfig( options ) else Slush_y.setConfig( options )
          return Slush_y.configuration( options );
        }
        function source( options ) {

          // Calls Slush_y.use( options )
          return Slush_y.source();
        }

        function register(){
          return __this.register(__dirname);
        }

    }).call(slush_y);



  // console.log(_.functions(slush_y.store));

}).call(this);

















