
;(function(){

  'use strict';
    var inquirer = require('inquirer');

    module.exports = defaultPrompts;


    function defaultPrompts (done) {

      var _this = this;
      var prompts = defaultQuestions();

      inquirer
        .prompt(prompts, promptCallback);


      /**
       * [promptCallback Callback invoked when prompt is finished]
       * @param  {Object} answers [A list of answers]
       */
      function promptCallback ( answers ) {

        done( answers )

      }

    }



    function defaultQuestions(){

      var questions = [
        {
          name: 'appName',
          message: 'What would you like to call your application?',
          default: 'ASD'
        }, {
          name: 'appDescription',
          message: 'How would you describe your application?',
          default: ''
        }, {
          name: 'appKeywords',
          message: 'How would you describe your application in comma seperated key words?',
          default: ''
        },{
          name: 'appAuthor',
          message: 'What is your company/author name?'
        },{
          type: 'list',
          name: 'script',
          message: 'What script would you like to use?',
          choices: [{
            value: 'js',
            name: 'Javascript',
            default: true
          }]

        },{
          type: 'list',
          name: 'httpType',
          message: 'How would you like to handle your http requests?',
          choices: [{
            value: 'http',
            name: 'angular $http',
            default: false
          },{
            value: 'restangular',
            name: 'Restangular',
            default: false
          }]
        },
        // {
        //   type: 'confirm',
        //   name: 'auth',
        //   message: 'Would you like authentication built in?',
        //   default: true
        // },
        {
          type: 'checkbox',
          name: 'modules',
          message: 'Which AngularJS modules would you like to include?',
          choices: [{
            value: 'angularCookies',
            name: 'ngCookies',
            checked: true
          }, {
            value: 'angularAnimate',
            name: 'ngAnimate',
            checked: true
          }, {
            value: 'angularTouch',
            name: 'ngTouch',
            checked: true
          }, {
            value: 'angularSanitize',
            name: 'ngSanitize',
            checked: true
          }]
        }];

      return questions;

    }


}).call(this);