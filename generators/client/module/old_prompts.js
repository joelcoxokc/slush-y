
;(function(){

  'use strict';

    var inquirer = require('inquirer');
    module.exports = modulePrompts;


    function modulePrompts (done) {

      var _this = this;
      var prompts = [];
      var questions = moduleQuestions();
      if(!_this.title){ prompts.push(questions[0]); }
      prompts.push(questions[1]);

      /**
       * Ask the first round of questions
       */
      inquirer
        .prompt(prompts, promptCallback);


      /**
       * [promptCallback Callback invoked when prompt is finished]
       * @param  {Object} answers [A list of answers]
       */
      function promptCallback ( answers ) {
        answers.moduleName = answers.moduleName || _this.title;
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
            default: _this.title

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