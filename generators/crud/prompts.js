
;(function(){

  'use strict';

    module.exports = controllerPrompts;


    function controllerPrompts () {

      var pendingPrompts = {
        folders: {
          type: 'checkbox',
          name: 'folders',
          message: 'Which supplemental folders would you like to include in your angular module?',
          choices: [{
            value: 'styles',
            name: 'styles',
            checked: true
          }, {
            value: 'images',
            name: 'images',
            checked: true
          }, {
            value: 'directives',
            name: 'directives',
            checked: true
          }, {
            value: 'filters',
            name: 'filters',
            checked: true
          }]
        },
        menu: {
            type: 'confirm',
            name: 'menu',
            message: 'Do you want to add this route to the menu?',
            default: true
        }
      }
      return pendingPrompts;

    }


}).call(this);