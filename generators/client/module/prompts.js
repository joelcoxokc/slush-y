
;(function(){

  'use strict';


    module.exports = modulePrompts;


    function modulePrompts (generator, done) {

      var __this = this;
      var prompts = moduleQuestions();

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

      function moduleQuestions(){

        var questions = [
          {
            name: 'moduleName',
            message: 'What would you like to name this module?',
            default: generator.title

          },{
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
          }];

        return questions;

      }
    }

}).call(this);