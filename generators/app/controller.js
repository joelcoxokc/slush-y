;(function () {
  'use strict';


    var _              = require('underscore.string');
    var Q              = require('q');
    var fs             = require('fs');
    var util           = require('util');
    var Promise        = require("bluebird");
    var inquirer       = require('inquirer');
    var BaseController = require('../../src/BaseController.js');


    var $storage = new BaseController


    // var prompt = Promise.promisify(require('inquirer').prompt);
    // console.log(prompt);

    util.inherits(Controller, BaseController);


    module.exports = new Controller;


    function Controller (args) {

      BaseController.apply(this, arguments);


        if (!(this instanceof Controller)) {
          return new Controller(args);
        }

      var that = this;

      function privateMethod(){
        /*
        * this method can be accessed by
        * privileged methods but not by
        * public methods.
        */

      }

      this.privilegedMethod = function(){
        /*
        * this method has access to both
        * the public and private properties
        * of the object
        */
      }
    }


    Controller.prototype.initConfig = function(args) {
      that.initConfig(args)
      console.log('this', that)


      return args
    };


    Controller.prototype.ask = function(prompts) {
      var $q = Q.defer();
      inquirer.prompt(prompts, function (answers){
          console.log('Answers from inside Conroller============================', answers)
          $q.resolve(answers)
      })
      return $q.promise;

    };


    Controller.prototype.configure = function(first_argument) {


    };

}());


// exports.argsError = function(){
// }

// exports.proccessFile = function( file ){
//   if (file.basename.indexOf('__') == 0) {
//     file.basename = '.' + file.basename.slice(2);
//   }
//   return file;
// }

// exports.ask = function( prompts ){

//   var promised = Q.defer();

//   inquirer.prompt( prompts, function (answers) {
//     if (!answers.appName) {
//       return promised.reject()
//     }
//     answers.auth = true;
//     answers.slugifiedAppName = _.slugify(answers.appName);
//     answers.humanizedAppName = _.humanize(answers.appName);
//     answers.capitalizedAppAuthor = _.capitalize(answers.appAuthor);
//     answers.angularCookies = _.contains(answers.modules, 'angularCookies');
//     answers.angularAnimate = _.contains(answers.modules, 'angularAnimate');
//     answers.angularTouch = _.contains(answers.modules, 'angularTouch');
//     answers.angularSanitize = _.contains(answers.modules, 'angularSanitize');
//     answers.clientDir = './client';
//     answers.serverDir = './server';
//     answers.auth = answers.auth;

//     if( !answers.auth ){ answers.base = true; }
//     if( answers.auth ){ answers.base = false; }

//     answers[ answers.script ] = true;

//     answers[answers.httpType] = true;
//     if(answers.httpType !== 'restangular'){ answers.restangular = false; }
//     if(answers.httpType !== 'http'){ answers.http = false; }


//     promised.resolve( answers );

//   });

//   return promised.promise;
// }
