(function(){

  'use strict';

  var _           = require('../lodash.mixins.js');
  var ___         = require('underscore.string');
  var chalk       = require('chalk');
  var inflections = require('inflection');
  var Q           = require('q');
  var mkdirp      = require('mkdirp');

  // console.log(_.contains())


  module.exports = Utility;


  function Utility(){
    this.mkdir = mkdirp;

    this.blue = chalk.blue;
    this.green = chalk.green;
    this.yellow = chalk.yellow;
    this.red = chalk.red;
    this.pink = chalk.pink;
    this.blueB = chalk.bold.blue;
    this.greenB = chalk.bold.green;
    this.yellowB = chalk.bold.yellow;
    this.redB = chalk.bold.red;
    this.pinkB = chalk.bold.magenta;

    this._ = _;

  }

  Utility.prototype.info = function(){
    console.log('['+this.pinkB('Slushy')+'] - ' ,this.blue( _.toArray(arguments).join(' ') ))
  }
  Utility.prototype.success = function(){
    console.log('['+this.pinkB('Slushy')+'] - ', this.green( _.toArray(arguments).join(' ')))
  }
  Utility.prototype.warn = function(){
    console.log('['+this.pinkB('Slushy')+'] - ', this.yellow( _.toArray(arguments).join(' ') ))
  }
  Utility.prototype.error = function(){
    console.log('['+this.pinkB('Slushy')+'] - ', this.red( _.toArray(arguments).join(' ') ))
  }
  Utility.prototype.log = function(){
    console.log('['+this.pinkB('Slushy')+'] -',  _.toArray(arguments).join(' '))
  }
  Utility.prototype.show = function(p1,p2,p3,p4,p5,p6){
    console.log('['+this.pinkB('============================slushy')+']', p1,p2,p3,p4,p5,p6)
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
  Utility.prototype.strings = function( params, name ){
    params.slugifiedName = ___.slugify(name);
    params.slugifiedPluralName = inflections.pluralize(params.slugifiedName);
    params.slugifiedSingularName = inflections.singularize(params.slugifiedName);
    params.camelizedPluralName = ___.camelize(params.slugifiedPluralName);
    params.camelizedSingularName = ___.camelize(params.slugifiedSisngularName);
    params.classifiedPluralName = ___.classify(params.slugifiedPluralName);
    params.classifiedSingularName = ___.classify(params.slugifiedSingularName);
    params.humanizedPluralName = ___.humanize(params.slugifiedPluralName);
    params.humanizedSingularName = ___.humanize(params.slugifiedSingularName);
    // console.log('===================', params)
    return params;
  }
  Utility.prototype.moduleStrings = function(options){
    var $promised = Q.defer();

    options.slugifiedModuleName = ___.slugify(___.humanize(options.moduleName));
    options.humanizedModuleName = ___.humanize(options.moduleName);
    options.slugifiedName = ___.slugify(options.moduleName);
    $promised.resolve(options);
    return $promised.promise;
  }
  Utility.prototype.alert = function(message, color){
    var color = color || 'red';
    console.log(  chalk[color](message)  );
  }
  Utility.prototype.argsError = function(options){
    var module = options.type;
    var $promised = Q.defer()
    if(!options.args[0]){
      this.log('**************************************************************************');
      this.log('******   '+this.redB('Incorrect usage of the sub-generator!!'));
      this.log('******   '+this.blueB('Try slush y:'+module+' <'+module+'-name>'));
      this.log('******   '+this.blueB('Ex: slush y:'+module+' article'));
      this.log('**************************************************************************');
      $promised.reject();
      return $promised.promise
    }
    options.moduleName = options.args[0];

    $promised.resolve(options)

    return $promised.promise;
  }
  Utility.prototype.path = function(){
    return _.toArray(arguments).join('/');
  }

  Utility.prototype.nameError = function(module){
    this.log('**************************************************************************');
    this.log('******   '+this.redB('Incorrect usage of the sub-generator!!'));
    this.log('******   '+this.blueB('Try slush y:'+module+' <'+module+'-name>'));
    this.log('******   '+this.blueB('Ex: slush y:'+module+' article'));
    this.log('**************************************************************************');
  }

  Utility.prototype.processName = function(name, bool){
    /**
     * Create a promise if a promise is invoking this function
     * @type {Promise}
     */
    var $promise; if ( bool ){ $promise = Q.defer(); }

    params.slugifiedName = ___.slugify(name);
    params.slugifiedPluralName = inflections.pluralize(params.slugifiedName);
    params.slugifiedSingularName = inflections.singularize(params.slugifiedName);
    params.camelizedPluralName = ___.camelize(params.slugifiedPluralName);
    params.camelizedSingularName = ___.camelize(params.slugifiedSisngularName);
    params.classifiedPluralName = ___.classify(params.slugifiedPluralName);
    params.classifiedSingularName = ___.classify(params.slugifiedSingularName);
    params.humanizedPluralName = ___.humanize(params.slugifiedPluralName);
    params.humanizedSingularName = ___.humanize(params.slugifiedSingularName);
  }

  Utility.prototype.context = function(functionToUse){
    var args = Array.prototype.slice.call(arguments);
    args.shift()
    functionToUse.apply(this, args);
  }

  ////////////////////////////////////////






})();







