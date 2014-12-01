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

      var _this      = this,
          config     = _this.config,
          prompts    = questions(),
          filters    = {},
          flags      = _(_this.flags);

          config.name  = _this.args[0],
          config.names = _this.str.simple( config.name )
          config.prompts = [];

      /////////////////////

      var defaults = {};
          defaults.functions = ['create', 'update', 'destroy'];
          defaults.providers = ['$scope'];



      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){

        _.forEach(_this.flags, function (flag, key){
          if(_.isEmpty(flag)) {
            console.log('test');
            config.prompts.push( prompts[key] );
            config.ask = true;
          } else {
            filters[key] = flag;
          }
        });


        if(_.size(config.prompts)){
          if( config.prompts[0].name ==='module' ){
              config.prompts[0].choices = _this.fs.findModules();
          }
        }

        if(config.ask){
          startPrompt( next );
        } else {
          next({});
        }

        function next(answers){
          // console.log(filters);

          filters.moduleNames = _this.str.simple( filters.module || answers.module );
          _.assign(filters, config);
          _.assign(filters, answers);
          filters.names = config.names;

          if(_.isEmpty(filters.functions)){
            filters.functions = defaults.functions;
          }
          // console.log(filters.providers)
          if(_.isEmpty(filters.providers)){
            filters.providers = defaults.providers;
          } else if(!_.contains( filters.providers, '$scope' )){

            filters.providers.unshift('$scope');
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
          .prompt(config.prompts, function (chosen){
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
          .pipe( $.rename( _this.fs.rename(config.name) ))
          .pipe( $.conflict( _this.cwd.final ))
          .pipe( gulp.dest( _this.cwd.final  ))
      }

    };


})();
