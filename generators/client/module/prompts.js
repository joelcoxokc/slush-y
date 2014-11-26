
;(function(){

  'use strict';

    module.exports = prompts;


    function prompts () {

      var pendingPrompts = {

            type: 'checkbox',
            name: 'folders',
            message: 'Which folders would you like your module to include?',
            choices: [{
              value: 'api',
              name: 'api',
              checked: true
            },{
              value: 'config',
              name: 'config',
              checked: true
            }, {
              value: 'controllers',
              name: 'controllers',
              checked: true
            }, {
              value: 'styles',
              name: 'styles',
              checked: false
            }, {
              value: 'directives',
              name: 'directives',
              checked: false
            }, {
              value: 'filters',
              name: 'filters',
              checked: false
            }, {
              value: 'images',
              name: 'images',
              checked: false
            }, {
              value: 'services',
              name: 'services',
              checked: true
            }, {
              value: 'tests',
              name: 'tests',
              checked: true
            }, {
              value: 'views',
              name: 'views',
              checked: true
            }]
          }

      return pendingPrompts;

    }


}).call(this);