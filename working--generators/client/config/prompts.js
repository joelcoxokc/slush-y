
;(function(){

  'use strict';

    var inquirer = require('inquirer');
    module.exports = configPrompts;


    function configPrompts (done) {

      var _this = this;
      // console.log(_this);


      /**
       * Find all the modules in the client/app/modules directory, and add them to the choices form the first question;
       */
      // prompts     = __this.findModules( prompts, __this.__modulesDir );

      /**
       * Ask the first round of questions
       */
      if(_this.questions.length){
        inquirer
          .prompt(_this.questions, promptCallback);
      }


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