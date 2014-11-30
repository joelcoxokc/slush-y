      // var dest = {};
      //     dest.app = path.join(process.cwd(), 'client/app');
      //     dest.modules = path.join(dest.app, 'modules');
      //     if(filters.moduleNames.slug === 'core'){
      //       dest.final = path.join(dest.app, 'core');
      //     } else {
      //       dest.final = path.join(dest.modules, filters.moduleNames.slug);
      //     }
(function(){
  'use strict';

    var $         = require('gulp-load-plugins')({lazy:false});
    var _         = require('lodash');
    var path      = require('path');
    var gulp      = require('gulp');
    var storage   = require('gulp-storage')(gulp)
    var questions = require('./prompts');
    var inquirer  = require('inquirer');
    var _str = require('../../../src/Utility/strings/index.js');
    var fs = require('fs');
    var chalk = require('chalk')


    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {
      var _this = this;
      var generator = _this.seq[0];
      // if(!_this.args[0]){
      //   console.log(chalk.bold.red('**************************************************************************'));
      //   console.log(chalk.bold.red('******   '+chalk.bold.red('Incorrect usage of the sub-generator!!')));
      //   console.log(chalk.bold.red('******   '+chalk.bold.red('Try slush y:'+generator+' <'+generator+'-name>')));
      //   console.log(chalk.bold.red('******   '+chalk.bold.red('Ex: slush y:'+generator+' article')));
      //   console.log(chalk.bold.red('**************************************************************************'));
      //   return done();
      // }

      _this.prompts = [];
      /////////////////////

      var templates = _this.templates;
      var dest = _this.cwd;
      var flags = _this.flags;
      var prompts = questions();
      var filters = {};
          filters.providers = [];
          filters.functions = [];
          filters.module    = null;
          filters.names     = {};

      var config = _this.config;
      var defaults = _this.defaults;
      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.name = _this.args[0];
        _this.names = _this.str.simple(_this.name);

        _.forEach( flags, function (flag, key){
          if(_.isEmpty(flag)){
            _this.prompts.push( prompts[key] )
          } else {
            filters[key] = flag;
          }

        })
        if(_.size( _this.prompts )){

          if(_this.prompts[0].name === 'module'){
            _this.prompts[0].choices = _this.fs.findModules();
          }

          startPrompt( next );

        } else {

          next({});

        }

        function next(answers){
          filters.moduleNames = _this.str.simple( answers.module || filters.module );
          _.assign(filters, config);
          _.assign(filters, answers);
          filters.names = _this.names;

          // console.log(filters.providers)

          if(filters.moduleNames.slug === 'core'){
            _this.cwd.final = path.join(_this.cwd.app, 'core');
          } else {
            _this.cwd.final = path.join(_this.cwd.modules, filters.moduleNames.slug);
          }

          generate()
        }

      }

      function startPrompt(callback){
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            if(chosen.providers ){finalAnswers.providers = chosen.providers.split(",")}
            if(chosen.functions ){finalAnswers.functions = chosen.functions.split(",")}
            if(chosen.module){finalAnswers.module = chosen.module}
            callback(finalAnswers)
          })
      }

      function generate(){
        gulp.src( _this.templates.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( _this.fs.rename(_this.names.slug) ))
          .pipe( $.conflict( _this.cwd.final ))
          .pipe( gulp.dest( _this.cwd.final  ))
      }

    };


})();
