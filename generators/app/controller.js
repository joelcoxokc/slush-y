var fs = require('fs');
var inquirer = require('inquirer');
var Q = require('q');
var _ = require('underscore.string');

exports.argsError = function(){
  console.log('******    Incorrect usage of the sub-generator!!      ******');
  console.log('******    Try slush y:controller <controller-name>    ******');
  console.log('******    Ex: slush y:controller article              ******');
}

exports.proccessFile = function( file ){
  if (file.basename.indexOf('__') == 0) {
    file.basename = '.' + file.basename.slice(2);
  }
  return file;
}

exports.ask = function( prompts ){

  var promised = Q.defer();

  inquirer.prompt( prompts, function (answers) {
    if (!answers.appName) {
      return promised.reject()
    }
    answers.slugifiedAppName = _.slugify(answers.appName);
    answers.humanizedAppName = _.humanize(answers.appName);
    answers.capitalizedAppAuthor = _.capitalize(answers.appAuthor);
    answers.angularCookies = _.contains(answers.modules, 'angularCookies');
    answers.angularAnimate = _.contains(answers.modules, 'angularAnimate');
    answers.angularTouch = _.contains(answers.modules, 'angularTouch');
    answers.angularSanitize = _.contains(answers.modules, 'angularSanitize');
    answers.clientDir = './client';
    answers.serverDir = './server';
    answers.auth = answers.auth;

    if( !answers.auth ){ answers.base = true; }
    if( answers.auth ){ answers.base = false; }

    answers[ answers.script ] = true;

    answers[answers.httpType] = true;
    if(answers.httpType !== 'restangular'){ answers.restangular = false; }
    if(answers.httpType !== 'http'){ answers.http = false; }


    promised.resolve( answers );

  });

  return promised.promise;
}








