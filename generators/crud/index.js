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
    var chalk = require('chalk');



    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( done ) {

      var _this = this;
      if(!_this.args[0]){
        console.log(chalk.bold.red('**************************************************************************'));
        console.log(chalk.bold.red('******   '+chalk.bold.red('Incorrect usage of the sub-generator!!')));
        console.log(chalk.bold.red('******   '+chalk.bold.red('Try slush y:'+generator+' <'+generator+'-name>')));
        console.log(chalk.bold.red('******   '+chalk.bold.red('Ex: slush y:'+generator+' article')));
        console.log(chalk.bold.red('**************************************************************************'));
        return done();
      }
      _this.storage.create('config-y','config-y.json');

      _this.prompts = [];
      _this.name = _this.args[0];
      _this.names = _str.str().multi(_this.name);
      /////////////////////

      var templates = _this.finder(__dirname+'/templates')

      var flags = {};
          flags.folders = _this.util.env.f || _this.util.env.folders || [];
          flags.menu    = _this.util.env.menu || false;

      var prompts = questions();

      var filters = {};
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};

      var config = _this.storage.get();

      var defaults = {};
          defaults.folders = ['filters', 'directives', 'images', 'styles'];

      var args = _this.args;

      var dest = {};
          dest.module = path.join(process.cwd(), 'src/js/app/modules', _this.names.plural.slug );
          dest.api = path.join(process.cwd(), 'server/api/', _this.names.single.slug )

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////

      function init(cb){

        if(!flags.folders.length){
        _this.prompts.push(prompts.folders)
        }
        if(!flags.menu){
          _this.prompts.push(prompts.menu)
        }
        if(_.isString(filters.folders)){
          filters.folders = flags.folders.split(',');
        } else {
          filters.folders = flags.folders;
        }
        filters.menu = flags.menu;

        if(_.size( _this.prompts )){

          startPrompt( next );

        } else {

          next({});

        }

        function next(answers){

          filters.moduleNames = _str.str().simple( _this.name );
          _.assign(filters, config);

          filters.folders = answers.folders || filters.folders;
          filters.menu =  answers.menu || flags.menu;
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
            if(chosen.menu ){finalAnswers.menu = chosen.menu }

            callback(finalAnswers);
          })
      }

      function generate(){
        if(_.size(filters.folders)) create_selected_folders();
        create_server_module();
        create_client_module();
        create_client_module_options();
        if(filters.menu) create_client_menu();
      }

      function create_selected_folders() {
        // filters.folders.push('!**/index')
        console.log(filters.folders)
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
      function create_client_menu(){

        gulp
          .src( templates.client.options.menu.all() )
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
