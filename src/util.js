(function(){

  'use strict';

  var _           = require('lodash');
  var ___         = require('underscore.string');
  var chalk       = require('chalk');
  var inflections = require('inflection');
  var Promis      = require('q');

  module.exports = Utility;


  function Utility(){
    this.blue = chalk.blue;
    this.green = chalk.green;
    this.yellow = chalk.yellow;
    this.red = chalk.red;
    this.blueB = chalk.bold.blue;
    this.greenB = chalk.bold.green;
    this.yellowB = chalk.bold.yellow;
    this.redB = chalk.bold.red;

  }

  Utility.prototype.info = function(){
    console.log('['+this.blue('Slushy')+'] - '+this.blue( getArgs(arguments) ))
  }
  Utility.prototype.success = function(){
    console.log('['+this.blue('Slushy')+'] - '+this.green( getArgs(arguments) ))
  }
  Utility.prototype.warn = function(){
    console.log('['+this.blue('Slushy')+'] - '+this.yellow( getArgs(arguments) ))
  }
  Utility.prototype.error = function(){
    console.log('['+this.blue('Slushy')+'] - '+this.red( getArgs(arguments) ))
  }
  Utility.prototype.log = function(){
    console.log('['+this.blue('Slushy')+'] - '+getArgs(arguments))
  }


  Utility.prototype.makeStrings = function( params, name ){
    params.slugifiedAppName = ___.slugify(name);
    params.slugifiedPluralAppName = inflections.pluralize(params.slugifiedAppName);
    params.slugifiedSingularAppName = inflections.singularize(params.slugifiedAppName);
    params.camelizedPluralAppName = ___.camelize(params.slugifiedPluralAppName);
    params.camelizedSingularAppName = ___.camelize(params.slugifiedSisngularAppName);
    params.classifiedPluralAppName = ___.classify(params.slugifiedPluralAppName);
    params.classifiedSingularAppName = ___.classify(params.slugifiedSingularAppName);
    params.humanizedPluralAppName = ___.humanize(params.slugifiedPluralAppName);
    params.humanizedSingularAppName = ___.humanize(params.slugifiedSingularAppName);
    return params;
  }
  Utility.prototype.alert = function(message, color){
    var color = color || 'red';
    console.log(  chalk[color](message)  );
  }
  Utility.prototype.argsError = function(module){
    $q = promise.defer()

    this.error('**************************************************************************');
    this.error('******   '+this.blueB('Incorrect usage of the sub-generator!!')+'    ***********************');
    this.error('******   '+this.blueB('Try slush y:'+module+'<'+module+'-name>')+'           ***********************');
    this.error('******   '+this.blueB('Ex: slush y:'+module+' article')+'                ***********************');
    this.error('**************************************************************************');

    $q.resolve()

    return $q.promise;
  }

  ////////////////////////////////////////
  function getArgs(args){
    return Array.prototype.slice.call(args).join(',')
  }





})();







