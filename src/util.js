(function(){

  'use strict';

    var _           = require('lodash');
    var ___         = require('underscore.string');
    var chalk       = require('chalk');
    var inflections = require('inflection');
    var Promis      = require('q');

    module.exports = Utility;


    function Utility(){
        this._ = ___;
        this.success    = chalk.bold.green;
        this.error      = chalk.bold.red;
        this.warn       = chalk.bold.yellow;
        this.info       = chalk.bold.blue

    }

    Utility.prototype.i = function(){
        console.log(this.info( getArgs(arguments) ))
    }
    Utility.prototype.win = function(){
        console.log(this.success( getArgs(arguments) ))
    }
    Utility.prototype.err = function(){
        console.log(this.error( getArgs(arguments) ))
    }
    Utility.prototype.no = function(){
        console.log(this.warn( getArgs(arguments) ))
    }


    Utility.prototype.makeStrings = function( params, name ){
        params.slugifiedName = ___.slugify(name);
        params.slugifiedPluralName = inflections.pluralize(params.slugifiedName);
        params.slugifiedSingularName = inflections.singularize(params.slugifiedName);
        params.camelizedPluralName = ___.camelize(params.slugifiedPluralName);
        params.camelizedSingularName = ___.camelize(params.slugifiedSisngularName);
        params.classifiedPluralName = ___.classify(params.slugifiedPluralName);
        params.classifiedSingularName = ___.classify(params.slugifiedSingularName);
        params.humanizedPluralName = ___.humanize(params.slugifiedPluralName);
        params.humanizedSingularName = ___.humanize(params.slugifiedSingularName);
        return params;
    }
    Utility.prototype.alert = function(message, color){
      var color = color || 'red';
      console.log(  chalk[color](message)  );
    }
    Utility.prototype.argsError = function(module){
        $q = promise.defer()

        console.log(this.info('**************************************************************************'));
        console.log(this.info('******   '+this.error('Incorrect usage of the sub-generator!!')+'    ***********************'));
        console.log(this.info('******   '+this.error('Try slush y:'+module+'<'+module+'-name>')+'           ***********************'));
        console.log(this.info('******   '+this.error('Ex: slush y:'+module+' article')+'                ***********************'));
        console.log(this.info('**************************************************************************'));

        $q.resolve()

        return $q.promise;
    }

    ////////////////////////////////////////
    function getArgs(args){
        return Array.prototype.slice.call(args)
    }





})();







