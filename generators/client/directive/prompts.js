
;(function(){

  'use strict';


    module.exports = directivePrompts;


    function directivePrompts (generator, done) {

      var __this = this;
      var prompts = directiveQuestions();

      /**
       * Find all the modules in the client/app/modules directory, and add them to the choices form the first question;
       */
      prompts     = __this.findModules( prompts, __this.__modulesDir );

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
    }



    function directiveQuestions(){

      var questions = [{

          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this directive belongs to?',
          choices: [{
              name: 'core',
              value: 'core'
            }]
        }];

      return questions;

    }


}).call(this);