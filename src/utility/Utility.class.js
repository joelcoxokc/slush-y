;(function(){

  'use strict';

    var _         = require('lodash');
    var _str      = require('underscore.string');
    var util      = require('util');
    var chalk     = require('chalk');
    var inflect   = require('inflection');
    var mkdirp    = require('mkdirp');
    var inquirer  = require('inquirer');



    var Utility = module.exports = function Utility (param) {

      var __this          = this;
          __this._red     = chalk.red;
          __this._redB    = chalk.bold.red;
          __this._blue    = chalk.blue;
          __this._blueB   = chalk.bold.blue;
          __this._green   = chalk.green;
          __this._greenB  = chalk.bold.green;
          __this._yellow  = chalk.yellow;
          __this._yellowB = chalk.bold.yellow;
          __this._pink    = chalk.magenta;
          __this._pinkB   = chalk.bold.magenta;
          __this._cyan    = chalk.cyan;
          __this._cyanB   = chalk.bold.cyan;

          __this._bold      = chalk.bold;
          __this._underline = chalk.underline;

          __this._heading     = '['+this._pinkB('Slushy')+'] - ';
          __this._headingErr  = '['+this._redB('Slushy')+'] - ';
          __this._headingShow = '['+this._pinkB('============================slushy')+']';

          __this.mkdirp = mkdirp;
          __this.prompt = inquirer.prompt;
    }

    // _.extend(Utility.prototype, require('../controllers/Utility.controller'))

    Utility.prototype.info = function(){
      var args = Array.prototype.slice.call(arguments);
      this.consoleLogger(args)

    }
    Utility.prototype.success = function(p1, p2, p3, p4, p5){
      this.logger(this._heading, '_green', p1, p2, p3, p4, p5);
    }
    Utility.prototype.warn = function(p1, p2, p3, p4, p5){
      this.logger(this._heading, '_yellow', p1, p2, p3, p4, p5);

    }
    Utility.prototype.error = function(){
      // this.logger(this._heading, '_red', p1, p2, p3, p4, p5);
      // this.consoleLogger.apply(null, ['red', arguments]);

    }
    Utility.prototype.log = function(p1, p2, p3, p4, p5){
      console.log(this._heading, p1, p2, p3, p4, p5);

    }
    Utility.prototype.show = function(p1,p2,p3,p4,p5){
      console.log(this._headingShow, p1, p2, p3, p4, p5);
    }
    Utility.prototype.logger = function(heading, color, p1,p2,p3,p4,p5){
      console.log(heading ,this[color]( p1 ), p2 , p3, p4, p5)
    }

    Utility.prototype.path = function(){
      return _.toArray(arguments).join('/');
    }

    Utility.prototype.str = function(){
      // var ref       = ref     || 'values';
      // options[ref]  = {};
      // options[ref].name = string;
      // console.log('string', string)

      return {
        simple: simple,
        multi:multi
      }

      function simple(name){
        var names = {};
        names.slug   = _str.slugify(name);
        names.classed   = _str.classify(names.slug);
        names.humanized = _str.humanize(names.slug);
        names.camelized = _str.camelize(names.slug);
        names.humanized = _str.humanize(name);
        return names;

      }
      function multi(name){
        var names = {};
        names.single = {};
        names.plural = {};
        names.slug              = _str.slugify(name);
        names.single.slug       =  inflect.singularize(names.slug);
        names.single.camel      =  _str.camelize(names.slug);
        names.single.classed    =  _str.classify(names.slug);
        names.single.humanized  =  _str.humanize(names.slug)
        names.plural.slug       =  inflect.pluralize(names.single.slug);
        names.plural.camel      =  _str.camelize(names.plural.slug);
        names.plural.classed    =  _str.classify(names.plural.slug);
        names.plural.humanized  =  _str.humanize(names.plural.slug);

        return names;
      }
    }


    Utility.prototype.files = function(options){

      return {
        replace: this.replaceDot(),
        rename: this.rename
      }
    }
    Utility.prototype.replaceDot = function(file){
      return function (file){
        if (file.basename.indexOf('__') == 0) {
          file.basename = '.' + file.basename.slice(2);
        }
      }
    }
    Utility.prototype.rename = function(name){

      return function (file){
        if (file.basename.indexOf('_') == 0) {
          file.basename = file.basename.replace('_', name);
        }
      }
    }
    Utility.prototype.nameError = function(module){
      console.log('**************************************************************************');
      console.log('******   '+this._redB('Incorrect usage of the sub-generator!!'));
      console.log('******   '+this._blueB('Try slush y:'+module+' <'+module+'-name>'));
      console.log('******   '+this._blueB('Ex: slush y:'+module+' article'));
      console.log('**************************************************************************');
    }

    Utility.prototype.consoleLogger = function( args ) {
      var sig = this._heading;
      args.unshift(sig);
      console.log.apply(console, args)
    }


}).call(this);