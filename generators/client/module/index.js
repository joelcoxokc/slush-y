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
    var fs = require('fs')


    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {

      var _this = this;

      // setDefaults();
      // generate();

      _this.prompts = [];
      _this.prompts.push( questions() );
      /////////////////////

      var filters = {};
          filters.providers = [];
          filters.functions = [];
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};


      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.name = _this.args[0];
        _this.names = _this.str.multi(_this.name);



          startPrompt( next );


        function next(answers){
          // console.log(filters);

          filters.moduleNames = _this.str.simple( _this.name );
          _.assign(filters, _this.config);
          _.assign(filters, answers);
          filters.names = _this.names;

          _this.cwd.final = path.join(_this.cwd.modules, _this.names.slug);

          generate()
        }


      }


      function startPrompt(callback){
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            if(chosen.folders){finalAnswers.folders = chosen.folders}
            callback(finalAnswers)
          })
      }


      function generate(){

        create_folders();
        create_module();
      }

      function create_folders(){

        gulp
          .src( _this.templates.options.dirs( filters.folders ) )
          .pipe( gulp.dest( _this.cwd.final ) )
      }

      function create_module(){
        gulp.src( _this.templates.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( _this.fs.rename(_this.names.slug) ))
          .pipe( $.conflict( _this.cwd.final ))
          .pipe( gulp.dest( _this.cwd.final  ))
      }

    };


})();
