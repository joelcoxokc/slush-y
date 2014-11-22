
;(function(){

  'use strict';

    module.exports = directivePrompts;


    function directivePrompts () {

      var pendingPrompts = {
        module : {
          type: 'list',
          name: 'module',
          default: 'core',
          message: 'Which module does this directive belongs to?'
        },
        providers: {
          name: 'providers',
          message: 'inject any providers? (please camma separate each)',
        },
        functions: {
          name: 'functions',
          message: 'add fucntions to the directive? (please camma separate each)',
        },
        type: {
          type: 'list',
          name: 'directiveType',
          message: 'What type of directive would you like to generate?',
          choices: [{
            value: 'complex',
            name: '(complex) --- comes with a view, styles, & test',
            default: true
          },{
            value: 'simple',
            name: '(simple)  --- comes with just a directive file'
          }]
        }
      }

      return pendingPrompts;

    }


}).call(this);