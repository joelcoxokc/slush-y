
;(function(){

  'use strict';
    var inquirer = require('inquirer')
    var _ = require('lodash')

    module.exports = servicePrompts;


    function servicePrompts (done) {

      var _this = this;
      if(!_.size(serviceQuestions())){
        _this.questions = _this.questions.concat(serviceQuestions());
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



    function serviceQuestions(){

      var questions = [];

      return questions;

    }


}).call(this);