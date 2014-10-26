
;(function(){

  'use strict';


    module.exports = prompts;


    function prompts(){

      var questions = [{

          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this service belongs to?',
          choices: [{
              name: 'core',
              value: 'core'
            }]
        }];


      return questions;

    }


}).call(this);