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
    var finder = require('gulp-finder')(gulp);


    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {

      var _this = this;
      _this.storage.create('config-y','config-y.json');

      _this.prompts = [];
      /////////////////////

      var templates = _this.finder(__dirname+'/templates')

      var flags = {};
          flags.folders = _this.util.env.f || _this.util.env.folders || [];

      if(!flags.folders.length){
        var prompts = questions();
        _this.prompts.push(prompts)
      }

      var filters = {};
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};

      var config = _this.storage.get();

      var defaults = {};
          defaults.folders = ['filters', 'directives', 'images', 'styles'];

      var args = _this.args;

      var dest = {};
          dest.module = path.join(process.cwd(), 'client/app/modules', _this.args[0] );
          dest.api = path.join(process.cwd(), 'server/api/', _this.args[0] )

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////

      function init(cb){
        _this.name = args[0];
        _this.names = _str.str().multi(_this.name);
        _.forEach( flags, function (flag, key){
          if(!_.isEmpty(flag) ){
             if(!Array.isArray(flag) ) {
              filters[key] = flag.split(',');
            } else {
              filters[key] = flag;
            }
          }
        })

        if(_.size( _this.prompts )){

          startPrompt( next );

        } else {

          next({});

        }

        function next(answers){
              console.log(filters.folders)

          filters.moduleNames = _str.str().simple( filters.module );
          _.assign(filters, config);

          filters.names = _this.names;

          if(_.isEmpty(filters.folders)){
            filters.folders = defaults.functions;
          }

          generate();
        }


      }

      function startPrompt(callback){
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            if(chosen.folders ){finalAnswers.folders = chosen.folders }
            callback(finalAnswers);
          })
      }

      function generate(){
        console.log(filters.folders)
        create_selected_folders();
        create_server_module();
        create_client_module();
        create_client_module_options();
      }

      function create_selected_folders() {
        gulp
          .src( templates.client.folders.dirs( filters.folders ) )
          .pipe( gulp.dest( dest.module ) );
      }

      function create_server_module() {

        gulp
          .src( templates.server.base.api.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  rename( filters.names.single.slug )))
          .pipe( $.conflict( dest.api ) )
          .pipe( gulp.dest( dest.api  ) );
      }
      function create_client_module() {

        gulp
          .src( templates.client.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( rename( filters.names.plural.slug )  )  )
          .pipe( $.conflict( dest.module ) )
          .pipe( gulp.dest( dest.module  ) );
      }
      function create_client_module_options(){

        gulp
          .src( templates.client.options[filters.httpType].all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  rename( filters.names.plural.slug )  )  )
          .pipe( $.conflict( dest.module ) )
          .pipe( gulp.dest( dest.module  ) );
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
