
;(function(){

  'use strict';

    var _ = require('lodash');
    var _str = require('underscore.string');

    module.exports = RoutePrompt;


    function RoutePrompt(generator, done){

      var __this       = this;
      var finalAnswers = [];


      var questions1   = [{

          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this route belongs to?',
          choices: [{
              name: 'core',
              value: 'core'
            }]
        },{
          type: 'list',
          name: 'routeType',
          message: 'What type of route would you like to generate?',
          choices: [{
            value: 'complex',
            name: '(complex) --- comes with a controller, view, controller.test, & route',
            default: true
          },{
            value: 'simple',
            name: '(simple)  --- comes with just a route & view'
          }]
        }];

        /**
         * Find all the modules in the client/app/modules directory, and add them to the choices form the first question;
         */
        questions1 = __this.findModules(questions1, __this.__modulesDir);

        /**
         * Ask first round of questions
         */
        __this.prompt( questions1, function (answers) {
            answers.moduleNames = __this.str().simple(answers.moduleName);
            _.assign(finalAnswers, answers);

            /**
             * Create the second round of questions, using the answers from the first round
             */
            var questions2 = fetchMoreQuestions( generator.args[0] );

            /**
             * Ask the second round of questions;
             */
            __this.prompt( questions2, function (answers) {
                answers.routePath       = _str.slugify( answers.routePath );
                answers.viewNames       = __this.str().simple( answers.viewName );
                answers.controllerNames = __this.str().simple( answers.controllerName );

                _.assign(finalAnswers, answers);

                /**
                 * Complete the prompting
                 */
                done( finalAnswers );
          });

        });


        /**
         * [fetchMoreQuestions creates the second round of questions based on the answers from the first round]
         * @param  {Object} finalAnswers [contains the answers from the first round of questions]
         * @return {Array}               [an array of new questions to ask the user]
         */
        function fetchMoreQuestions(name){

          var questions = [{
            name: 'routePath',
            message: 'What do you want your route path to be?',
            default: name
          }]
          var complexQuestions = [{
            name: 'viewName',
            message: 'What do you want to call your view?',
            default: name
          }, {
            name: 'controllerName',
            message: 'What do you want to call your controller?',
            default: _str.classify(_str.slugify(name))
          }];

          if( finalAnswers.routeType === 'complex' ){
            finalAnswers.complex = true;
            _.forEach( complexQuestions, function (item){
              questions.push(item);
            })
          }
          return questions;
        }

    }


}).call(this);