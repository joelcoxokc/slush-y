;(function(){

  'use strict';

    var Flags = module.exports;
        Flags.checkFlags = checkFlags;
        Flags.makePrompts = makePrompts;
        Flags.getPrompts = getPrompts;

        function checkFlags(generator){
          var temp = {}
          // var m    = generator.util.env.m || [];
          var f    = generator.util.env.f || [];
          var p    = generator.util.env.p || [];
          // temp.module    = generator.util.env.module    || m;
          temp.providers = generator.util.env.providers || p;
          temp.functions = generator.util.env.functions || f;
          _(temp).forEach(function (val, key){
            if( _.isString(val) ){ val = val.split(','); }
            temp[key] = val;
          })
          return temp;
        }

        function makePrompts(generator){
          var __this = this;

          var args = __this.checkFlags(generator);
          var prompts = _(args).map(function (val, key){
            if(_.size( val )){
              return getPrompts(key);
            }
          });
          return prompts;

        }

        function getPrompts( arg ){
          var pendingPrompts = {
            providers: {
              name: 'providers',
              message: 'inject any providers? (please camma separate each)',
            },
            scopeFunctions: {
              name: 'scopeFunctions',
              message: 'add fucntions to $scope? (please camma separate each)',
            }
          }
          return pendingPrompts[arg]
        }


}).call(this);