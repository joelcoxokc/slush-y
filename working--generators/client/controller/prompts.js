
;(function(){

  'use strict';
    var _ = require('lodash');
    var inquirer = require('inquirer')

    module.exports = controllerPrompts;


    function controllerPrompts (done) {

      var _this = this;

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


}).call(this);