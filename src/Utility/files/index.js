;(function(){
  var fs = require('fs');
  'use strict';

    var Files    = module.exports;
    Files.files  = files;


    function files(){
      return {
        replace: replace(),
        rename:  rename
      };
    }

    function replace(){
      return function (file){
        if (file.basename.indexOf('__') == 0) {
          file.basename = '.' + file.basename.slice(2);
        }
      };
    }

    function rename ( name ) {
      return function (file){
        if (file.basename.indexOf('_') == 0) {
          file.basename = file.basename.replace('_', name);
        }
      };
    }

}).call(this);
