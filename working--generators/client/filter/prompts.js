
;(function(){

  'use strict';
    var inquirer = require('inquirer')
    var _ = require('lodash')
    module.exports = filterPrompts;


    function filterPrompts (done) {

      var _this = this;

      if( _.size(filterQuestions() )){
        _this.questions = _this.questions.concat(filterQuestions());
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



    function filterQuestions(){

      var questions = [];

      return questions;

    }


}).call(this);