
;(function(){

  'use strict';
    var _ = require('lodash');
    var _s = require('underscore.string');
    // _s.include = _s.str.include
    module.exports = controllerPrompts;


    function controllerPrompts () {

      var pendingPrompts = {
        module : {
          type: 'list',
          name: 'module',
          default: 'core',
          message: 'Which module does this controller belongs to?'
        },
        fields: {
          type: 'input',
          name: 'fields',
          message: 'Schema Fields?',
          default: '',
          validate: function(answer){
            if(answer.length){
              if(_s.include(answer, ':')){
                return true
              } else {
                return 'Please Separate the key and value like so name:String';
              }
            } else {
              return true;
            }
          }
        }
      }
      return pendingPrompts;

    }


}).call(this);