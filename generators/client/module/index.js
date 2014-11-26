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
      _this.storage.create('config-y','config-y.json');

      // setDefaults();
      // generate();

      _this.prompts = [];
      _this.prompts.push( questions() );
      /////////////////////

      var templates = _this.finder(__dirname + '/templates');

      var dest = {};
          dest.modules = path.join(process.cwd(), 'client/app/modules');

      var flags = {};




      var filters = {};
          filters.providers = [];
          filters.functions = [];
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};

      var config = _this.storage.get();


      var defaults = {};
          defaults.functions = ['create', 'update', 'destroy'];

      var args = _this.args;

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.name = args[0];
        _this.names = _str.str().multi(_this.name);



          startPrompt( next );


        function next(answers){
          // console.log(filters);

          filters.moduleNames = _str.str().simple( _this.name );
          _.assign(filters, config);
          _.assign(filters, answers);
          filters.names = _this.names;

          if(_.isEmpty(filters.functions)){
            filters.functions = defaults.functions;
          }

          dest.final = path.join(dest.modules, _this.names.slug);

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
          .src( templates.options.dirs( filters.folders ) )
          .pipe( gulp.dest( dest.final ) )
      }

      function create_module(){
        gulp.src( templates.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( rename(_this.names.plural.slug) ))
          .pipe( $.conflict( dest.final ))
          .pipe( gulp.dest( dest.final  ))
      }

      function rename ( name ) {
        return function (file){
          if (file.basename.indexOf('_') == 0) {
            file.basename = file.basename.replace('_', name);
          }
        };
      }

    };


})();
