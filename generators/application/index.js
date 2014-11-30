(function(){
  'use strict';

    var $         = require('gulp-load-plugins')({lazy:false});
    var _         = require('lodash');
    var path      = require('path');
    var gulp      = require('gulp');
    var storage   = require('gulp-storage')(gulp)
    var questions = require('./prompts');
    var inquirer  = require('inquirer');
    var _str = require('../../src/Utility/strings/index.js');
    var fs = require('fs')


    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {

      var _this = this;
      _this.storage.create('config-y','config-y.json');

      // setDefaults();
      // generate();
      _this.prompts = questions();
      /////////////////////

      var templates = _this.finder(__dirname+'/templates')


      var dest = {};
          dest.root = process.cwd();
          dest.app = './client/app';
          dest.server = './server';

      var filters = {};
          filters.appName   = null;

      var config = _this.storage.get();


      var defaults = {};

      var args = _this.args;

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.appName = args[0];
        _this.app_names = _str.str().multi(_this.appName);
        if( _.size(_this.prompts) ){
          startPrompt( next );
        } else {

          next({});

        }

        function next(answers){
          // console.log(filters);

            config.appName = answers.appName;
            config.app_names = _str.str().multi(answers.appName);
            config[answers.script] = true;
            _.assign(config, answers)

            if(config.httpType ==='restangular') {
              config.restangular = true;
              config.http = false;
            } else {
              config.restangular = false;
              config.http = true;
            }
            // config[answers.httpType] = true;
            // config.restangular = false;

            _this.storage.store( config );

          _.assign(filters, config);
          generate()
        }
      }


      function startPrompt(callback){
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            callback(chosen)
          })
      }


      function generate(){
        create_server();
        create_statics();
        create_base();
        create_options();
      }

      /**
         * Generator the server
         */
        function create_server(){

          gulp
            .src( templates.server.base.all() )
              .pipe($.template( filters ))
              .pipe($.conflict( dest.server ) )
              .pipe( gulp.dest( dest.server ) )
        }

        /**
         * Generate all static assets, and root level files
         */
        function create_statics(){
          gulp
            .src( templates.static.base.all() )
              .pipe($.rename( replace() ) )
              .pipe($.template( filters ))
              .pipe($.conflict( dest.root ) )
              .pipe( gulp.dest( dest.root ) )
        }

        /**
         * Generate client from chosen script directory type!
         */
        function create_base(){
          gulp
            .src( templates.client.base.all() )
              .pipe($.rename( replace() ) )
              .pipe($.template( filters ))
              .pipe($.conflict( dest.app ))
              .pipe( gulp.dest( dest.app ))
        }

        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        function create_options(){
          gulp
            .src( templates.client.options[filters.httpType].all() )
              .pipe($.rename( replace() ) )
              .pipe($.template( filters ))
              .pipe($.conflict( dest.app ))
              .pipe( gulp.dest( dest.app ));
        }

        function rename ( name ) {
          return function (file){
            if (file.basename.indexOf('_') == 0) {
              file.basename = file.basename.replace('_', name);
            }
          };
        }
        function replace(){
          return function (file){
            if (file.basename.indexOf('__') == 0) {
              file.basename = '.' + file.basename.slice(2);
            }
          };
        }

    };


})();
