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
    var chalk = require('chalk');


    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {

      var _this = this;
      var generator = _this.seq[0];
      _this.prompts = [];
      /////////////////////

      var prompts = questions();

      var filters = {};
          filters.providers = [];
          filters.functions = [];
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};


      var defaults = {};
          defaults.functions = ['byName', 'byAge'];

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.name = _this.args[0];
        _this.names = _this.str.simple(_this.name);

        _.forEach( _this.flags, function (flag, key){
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
          // console.log(filters);

          filters.moduleNames = _this.str.simple( filters.module || answers.module );
          _.assign(filters, _this.config);
          _.assign(filters, answers);
          filters.names = _this.names;

          if(_.isEmpty(filters.functions)){
            filters.functions = defaults.functions;
          }

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
