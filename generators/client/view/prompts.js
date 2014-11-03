
;(function(){

  'use strict';
    var inquirer = require('inquirer')
    var _ = require('lodash')


    module.exports = viewPrompts;


    function viewPrompts (generator, done) {

      var __this = this;
      var questions = viewQuestions();

      if( _.size(questions) ){
        __this.prompts = __this.prompts.concat( questions )
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



    function viewQuestions(){

      var questions = [];


      return questions;

    }


}).call(this);