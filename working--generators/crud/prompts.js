
;(function(){

  'use strict';


    module.exports = crudPrompts;


    function crudPrompts (generator, done) {

      var __this = this;
      var prompts = crudQuestions();

      /**
       * Ask the first round of questions
       */
      __this
        .prompt(prompts, promptCallback);


      /**
       * [promptCallback Callback invoked when prompt is finished]
       * @param  {Object} answers [A list of answers]
       */
      function promptCallback ( answers ) {

        /**
         * Complete the prompt;
         */

        done( answers )
      }

      function crudQuestions(){

        var questions = [{
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
        }
        // {
        //   type: 'confirm',
        //   name: 'addMenuItems',
        //   message: 'Would you like to add the CRUD module links to a menu?',
        //   default: true
        // }
        ];

        return questions;

      }
    }

}).call(this);