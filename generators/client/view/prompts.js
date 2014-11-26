
;(function(){

  'use strict';

    module.exports = prompts;


    function prompts () {

      var pendingPrompts = {
        module : {
          type: 'list',
          name: 'module',
          default: 'core',
          message: 'Which module does this view belongs to?'
        }
      }

      return pendingPrompts;

    }


}).call(this);