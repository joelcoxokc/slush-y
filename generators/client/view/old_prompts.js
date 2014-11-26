
;(function(){

  'use strict';
    var inquirer = require('inquirer')
    var _ = require('lodash')


    module.exports = viewPrompts;


    function viewPrompts (done) {

      var _this = this;
      var questions = viewQuestions();

      if( _.size(questions) ){
        _this.questions = _this.questions.concat( questions )
      }

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

        /**
         * Complete the prompt;
         */
        done( answers )
      }
    }



    function viewQuestions(){

      var questions = [];


      return questions;

    }


}).call(this);