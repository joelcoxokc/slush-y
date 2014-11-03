;(function(){
  var _ = require('lodash');
  'use strict';

    var Flags = module.exports;
        Flags.checkFlags = checkFlags;
        Flags.makePrompts = makePrompts;
        Flags.getPrompts = getPrompts;

        function checkFlags(){
          var __this = this;
          var temp = {}
          // var m    = __this.util.env.m || [];
          var f    = __this.util.env.f || [];
          var p    = __this.util.env.p || [];
          // temp.module    = __this.util.env.module    || m;
          temp.providers = __this.util.env.providers || p;
          temp.functions = __this.util.env.functions || f;
          _(temp).forEach(function (val, key){
            if( _.isString(val) ){ val = val.split(','); }
            temp[key] = val;
          })
          return temp;
        }

        function makePrompts(){
          var __this = this;

          var args = __this.checkFlags();
          var prompts = [];
          _.forEach(args, function (val, key){

            if(_.isEmpty( val )){
              prompts.push( getPrompts(key) )
            }
            // return val
          });

          return {flags: args, prompts: prompts};

        }

        function getPrompts( arg ){
          var pendingPrompts = {
            providers: {
              name: 'providers',
              message: 'inject any providers? (please camma separate each)',
            },
            functions: {
              name: 'functions',
              message: 'add fucntions to $scope? (please camma separate each)',
            }
          }
          return pendingPrompts[arg]
        }


}).call(this);