var fs = require('fs');
var inquirer = require('inquirer');
var Q = require('q');
var _ = require('underscore.string');
var util = require('../../../util')
var mkdirp = require('mkdirp')

exports.argsError = function(){
  console.log('******    Incorrect usage of the sub-generator!!        ******');
  console.log('******    Try slush y:crud-module <module-name>         ******');
  console.log('******    Ex: slush y:crud-module article               ******');
}

exports.processFile = function( file, answers ){
  if (file.basename.indexOf('_') == 0) {
        file.basename = answers.slugifiedSingularName + '.'+file.basename.slice(2);
  }
}
exports.processClientFiles = function( file, answers ){
  if (file.basename.indexOf('_') == 0) {
        file.basename = answers.slugifiedSingularName + '.'+file.basename.slice(2);
    }
}
exports.processServerFiles = function( file, answers ){
  if (file.basename.indexOf('list') >= 0) {
    file.basename = file.basename.replace('_', answers.slugifiedPluralName) ;
  }
  else {
    file.basename = file.basename.replace('_', answers.slugifiedSingularName) ;
  }
}

exports.ask = function( prompts ){

  var promised = Q.defer();

  inquirer.prompt( prompts, function (answers) {
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
