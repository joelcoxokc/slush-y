;(function(){

  'use strict';

    var _         = require('lodash');
    var _str      = require('underscore.string');
    var inflect   = require('inflection');
    var util      = require('util');
    var chalk     = require('chalk');
    var mkdirp    = require('mkdirp');
    var inquirer  = require('inquirer');



    var Utility = module.exports = function Utility (param) {

      var __this          = this;

          __this._heading     = '['+chalk.bold.magenta('Slushy')+'] - ';
          __this._headingErr  = '['+chalk.bold.red('Slushy')+'] - ';
          __this._headingShow = '['+chalk.bold.magenta('============================slushy')+']';

          __this.mkdirp = mkdirp;
          __this.prompt = inquirer.prompt;
    }

    _.extend(Utility.prototype, require('./logger'));
    _.extend(Utility.prototype, require('./strings'));
    _.extend(Utility.prototype, require('./files'));


    Utility.prototype.path = function(){
      return _.toArray(arguments).join('/');
    }



    Utility.prototype.nameError = function(module){
      this.log(chalk.bold.red('**************************************************************************'));
      this.log(chalk.bold.red('******   '+chalk.bold.red('Incorrect usage of the sub-generator!!')));
      this.log(chalk.bold.red('******   '+chalk.bold.red('Try slush y:'+module+' <'+module+'-name>')));
      this.log(chalk.bold.red('******   '+chalk.bold.red('Ex: slush y:'+module+' article')));
      this.log(chalk.bold.red('**************************************************************************'));
    }



}).call(this);