
;(function(){

  'use strict';
    var _str = require('underscore.string')
    module.exports = prompts;


    function prompts (name) {

      var pendingPrompts = {
        module : {
          type: 'list',
          name: 'module',
          default: 'core',
          message: 'Which module does this factory belongs to?'
        },
        type : {
          type: 'list',
          name: 'routeType',
          message: 'What type of route would you like to generate?',
          choices: [{
            value: 'complex',
            name: '(complex) --- comes with a controller, view, controller.test, & route',
            default: true
          },{
            value: 'simple',
            name: '(simple)  --- comes with just a route & view'
          }]
        },
        routePath: {
            type: 'input',
            name: 'routePath',
            message: 'What do you want your route path to be?',
            default: name

        },
        viewName:{
            type: 'input',
            name: 'viewName',
            message: 'What do you want to call your view?',
            default: name
        },
        controllerName: {
            type: 'input',
            name: 'controllerName',
            message: 'What do you want to call your controller?',
            default: _str.classify(_str.slugify(name))
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