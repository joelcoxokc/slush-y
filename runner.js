;(function(){
    'use strict';

    var Slushy = module.exports = (function() {

      'use strict';

        var __instance = {
          defaults:  defaults,
          register:  register,
          prompts:   prompts,
          siphon:    siphon,
          config:    config,
          source:    source
        };

        return __instance;

        ////////////////////////

        function siphon(__Generator, options){

          return function (done){

            __instance
                .get(options)
                .then( __instance.use(  __instance.defaults ))
                .then( __instance.use(  __instance.prompts  ))
                .then( __instance.use(  __instance.config   ))
                .then( __instance.use(  __instance.source   ))
                .then( __instance.use(  __Generator         ))
                .catch( done )
          }
        }
        function use (callback, options){

          return callback.apply(__instance, arguments);
        }
        function defaluts(data){

          return data;
        }
        function prompts(data){

          return data;
        }
        function config(data){

          return data;
        }
        function source(data){

          return data;
        }

    }());

}).call(this);























