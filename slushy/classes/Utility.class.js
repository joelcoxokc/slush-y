;(function(){

  'use strict';

    var _         = require('lodash');
    var _str      = require('underscore.string');
    var util      = require('util');
    var chalk     = require('chalk');
    var inflect   = require('inflection');
    var mkdirp    = require('mkdirp');
    var inquirer  = require('inquirer');

    module.exports = Utility;

    function Utility (param) {

      var __this      = this;
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

    Utility.prototype.info = function(p1, p2, p3, p4, p5){
      this.logger(this._heading, '_blue', p1, p2, p3, p4, p5);
    }
    Utility.prototype.success = function(p1, p2, p3, p4, p5){
      this.logger(this._heading, '_green', p1, p2, p3, p4, p5);
    }
    Utility.prototype.warn = function(p1, p2, p3, p4, p5){
      this.logger(this._heading, '_yellow', p1, p2, p3, p4, p5);

    }
    Utility.prototype.error = function(p1, p2, p3, p4, p5){
      this.logger(this._heading, '_red', p1, p2, p3, p4, p5);

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

    Utility.prototype.str = function(string, ref, options){
      var options   = options || {};
      var ref       = ref     || 'values';
      options[ref]  = {};
      options[ref].name = string;
      options = base(options);

      return {
        values: options,
        multi:multi
      }

      function base(options){
        options[ref].slug      = _str.slugify(_str.humanize(options[ref].name));
        options[ref].classed   = _str.classify(options[ref].slug);
        options[ref].humanized = _str.humanize(options[ref].slug);
        options[ref].camelized = _str.camelize(options[ref].slug);
        options[ref].humanized = _str.humanize(options[ref].name);
        return options;

      }
      function multi(){
        options[ref].slugPlural       = inflect.pluralize(options[ref].slug);
        options[ref].slugSingle       = inflect.singularize(options[ref].slug);
        options[ref].camelPlural      = _str.camelize(options[ref].slugPlural);
        options[ref].camelSingle      = _str.camelize(options[ref].slugSingle);
        options[ref].classedPlural    = _str.classify(options[ref].slugPlural);
        options[ref].classedSingle    = _str.classify(options[ref].slugSingle);
        options[ref].humanizedPlural  = _str.humanize(options[ref].slugPlural);
        options[ref].humanizedSingle  = _str.humanize(options[ref].slugSingle);
        return options;
      }
    }


    Utility.prototype.files = function(options){

      return {
        replace: this.replaceDot(),
        rename: this.rename(options)
      }
    }
    Utility.prototype.replaceDot = function(){

      return function (file){
        if (file.basename.indexOf('__') == 0) {
          file.basename = '.' + file.basename.slice(2);
        }
        console.log(file)
      }
    }
    Utility.prototype.rename = function(options){

      return function (file){
        if (file.basename.indexOf('_') == 0) {
          file.basename = file.basename.replace('_', options.slug);
        }
      }
    }
    Utility.prototype.nameError = function(module){
      this.log('**************************************************************************');
      this.log('******   '+this.redB('Incorrect usage of the sub-generator!!'));
      this.log('******   '+this.blueB('Try slush y:'+module+' <'+module+'-name>'));
      this.log('******   '+this.blueB('Ex: slush y:'+module+' article'));
      this.log('**************************************************************************');
    }
    // var ut = new Utility



    // var options = ut.str('Joel Thomas Cox', 'moduleName', {}).multi()
    // console.log(options.moduleName.slugPlural)

    // _.capitalize
    // _.join
    // _.endsWith
    // _.humanize


/*

_.slugify("Un éléphant à l'orée du bois")
=> 'un-elephant-a-loree-du-bois';

 */

/*

  _('moz-transform').camelize()
  => 'mozTransform'
  _('-moz-transform').camelize()
  => 'MozTransform'
*/

/*

_('some_class_name').classify()
=> 'SomeClassName'

 */

    // _.classify

/*

_.pad("1", 8)
-> "       1";

 */



}).call(this);