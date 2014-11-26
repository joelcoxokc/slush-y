
;(function(){

  'use strict';
    var _ = require('lodash');
    var inquirer = require('inquirer')

    module.exports = directivePrompts;


    function directivePrompts (done) {

      var _this = this;
      _this.questions = _this.questions.concat( directiveQuestions() );

      /**
       * Ask the first round of questions
       */
       inquirer
        .prompt(_this.questions, promptCallback);


      /**
       * [promptCallback Callback invoked when prompt is finished]
       * @param  {Object} answers [A list of answers]
       */
      function promptCallback ( answers ) {
        answers[answers.directiveType] = true;

        /**
         * Complete the prompt;
         */
        done( answers )
      }
    }



    function directiveQuestions(){

      var questions = [{
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
        }];

      return questions;

    }


}).call(this);