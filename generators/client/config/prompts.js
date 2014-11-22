
;(function(){

  'use strict';

    module.exports = configPrompts;


    function configPrompts () {

      var pendingPrompts = {
        module : {
          type: 'list',
          name: 'module',
          default: 'core',
          message: 'Which module does this config belong to?'
        },
        providers: {
          name: 'providers',
          message: 'inject any providers? (please camma separate each)',
        }
      }
      return pendingPrompts;

    }


}).call(this);