;(function(){
    'use strict';

      var path = require('path');
      var _    = require('lodash');

      var Crawler = module.exports = function(root){

        var val = null;
        if( root ){
          val = root;
        }

        var instance = {
          val: val,
          src: src,
          any: any,
          every: every,
          all: all,

          one: one,
        }

        return instance;

        function src(root){
          if(!root){
            return console.log('You must specify a starting point, not ', root);
          }
          var newInstance = instance;
          newInstance.val = root;
          return newInstance;
        }

        function one(file){
          if(!file){
            return console.log('You must specify a starting point, not ', file);
          }
          var newInstance = instance;
          newInstance.val = path.join( instance.val, file);
          return newInstance;
        }

        function any(ext){
          if(ext){
            var ext = '**'+ext;
          } else {
            ext = '**/*'
          }
          var newInstance = instance;
          newInstance.val = path.join( instance.val, ext);
          return newInstance;
        }

        function every(ext){
          if(!ext){
            return console.log('You must specify a pattern, not ', file);
          }
          var ext = '*.'+ext;
          var newInstance = instance;
          newInstance.val = path.join( instance.val, ext);
          return newInstance;
        }

        function all(ext){
          if(!ext){
            return console.log('You must specify a pattern, not ', file);
          }
          var ext = '**/*.'+ext;
          var newInstance = instance;
          newInstance.val = path.join( instance.val, ext);
          return newInstance;
        }


      }

}).call(this);