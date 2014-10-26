
;(function(){

  'use strict';


    module.exports = prompts;


    function prompts(){

      var __this = this;

      var questions = [{

          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this factory belongs to?',
          choices: [{
              name: 'core',
              value: 'core'
            }]
        }];

      return questions;

    }


}).call(this);