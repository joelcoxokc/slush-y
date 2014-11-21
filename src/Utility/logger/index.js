;(function(){

  var chalk = require('chalk');
  var _     = require('lodash');
  var util  = require('util')
  'use strict';

    var logger      = module.exports;
    logger.log      = log;
    logger.info     = info;
    logger.warn     = warn;
    logger.show     = show;
    logger.error    = error;

    function log(){

      console.log.apply(console, arguments)
    }

    function success(){
      this.log( this._heading, chalk.green(util.format.apply(util, arguments) ) );
    }

    function info(){
      this.log( this._heading, chalk.blue(util.format.apply(util, arguments) ) );
    }

    function warn(){
      this.log(this._heading, chalk.yellow(util.format.apply(util, arguments) ))
    }

    function error(){
      this.log(this._headingErr, chalk.red(util.format.apply(util, arguments) ))
    }

    function show(){
      this.log(this._headingShow, util.format.apply(util, arguments) )
    }


}).call(this);