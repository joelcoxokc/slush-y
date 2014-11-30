(function(){
  'use strict';

    var $         = require('gulp-load-plugins')({lazy:false});
    var _         = require('lodash');
    var path      = require('path');
    var gulp      = require('gulp');
    var questions = require('./prompts');
    var inquirer  = require('inquirer');


    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {

      var _this = this;
      _this.prompts = questions();
      /////////////////////

      var filters = {};
          filters.appName   = null;


      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.appName = _this.args[0];
        _this.app_names = _this.str.multi(_this.appName);
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


            _this.storage.store( _this.config );

          _.assign(filters, _this.config);
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
            .src( _this.templates.server.base.all() )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.cwd.server ) )
              .pipe( gulp.dest( _this.cwd.server ) )
        }

        /**
         * Generate all static assets, and root level files
         */
        function create_statics(){
          gulp
            .src( _this.templates.static.base.all() )
              .pipe($.rename( _this.fs.replace() ) )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.cwd.root ) )
              .pipe( gulp.dest( _this.cwd.root ) )
        }

        /**
         * Generate client from chosen script directory type!
         */
        function create_base(){
          gulp
            .src( _this.templates.client.base.all() )
              .pipe($.rename( _this.fs.replace() ) )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.cwd.app ))
              .pipe( gulp.dest( _this.cwd.app ))
        }

        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        function create_options(){
          gulp
            .src( _this.templates.client.options[filters.httpType].all() )
              .pipe($.rename( _this.fs.replace() ) )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.cwd.app ))
              .pipe( gulp.dest( _this.cwd.app ));
        }


    };


})();
