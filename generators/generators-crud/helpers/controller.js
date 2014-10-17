var fs = require('fs');
var inquirer = require('inquirer');
var Q = require('q');
var _ = require('underscore.string');
var util = require('../../../util')
exports.argsError = function(){
  console.log('******    Incorrect usage of the sub-generator!!        ******');
  console.log('******    Try slush y:crud-module <module-name>         ******');
  console.log('******    Ex: slush y:crud-module article               ******');
}

exports.proccessFile = function( file ){
  if (file.basename.indexOf('_') == 0) {
        file.basename = answers.slugifiedSingularName + '.'+file.basename.slice(2);
    }
}

exports.ask = function( prompts ){

  var promised = Q.defer();

  inquirer.prompt( prompts, function (answers) {
    if (!answers.appName) {
      return promised.reject()
    }

    answers.addCSSFolder = _.contains(answers.folders, 'addCSSFolder');
    answers.addImagesFolder = _.contains(answers.folders, 'addImagesFolder');
    answers.addDirectivesFolder = _.contains(answers.folders, 'addDirectivesFolder');
    answers.addFiltersFolder = _.contains(answers.folders, 'addFiltersFolder');
    answers.addMenuItems = answers.addMenuItems;
    promised.resolve( answers );

  });

  return promised.promise;
}
exports.prepareDirecories = function(answers){
    //client folders
    if (answers.addCSSFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/css');
    if (answers.addImagesFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/img');
    if (answers.addDirectivesFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/directives');
    if (answers.addFiltersFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/filters');

    mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/config');
    mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/controllers');
    mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/services');
    mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/tests');
}
