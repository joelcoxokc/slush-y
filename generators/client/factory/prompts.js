
;(function(){

  'use strict';
    var _ = require('lodash');
    var inquirer = require('inquirer')

    module.exports = factoryPrompts;


    function factoryPrompts (done) {

      var __this = this;
      var questions = factoryQuestions();

      if(_.size(questions)){
        __this.prompts.concat();
      }

      /**
       * Ask the first round of questions
       */
      inquirer
        .prompt(__this.prompts, promptCallback);


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



    function factoryQuestions(){

      var questions = [];

      return questions;

    }


}).call(this);