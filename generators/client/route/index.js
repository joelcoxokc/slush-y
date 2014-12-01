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
      if(!_this.args[0]){
        console.log(chalk.bold.red('**************************************************************************'));
        console.log(chalk.bold.red('******   '+chalk.bold.red('Incorrect usage of the sub-generator!!')));
        console.log(chalk.bold.red('******   '+chalk.bold.red('Try slush y:'+generator+' <'+generator+'-name>')));
        console.log(chalk.bold.red('******   '+chalk.bold.red('Ex: slush y:'+generator+' article')));
        console.log(chalk.bold.red('**************************************************************************'));
        return done();
      }
      _this.storage.create('config-y','config-y.json');

      // setDefaults();
      // generate();

      _this.prompts = [];
      /////////////////////

      var templates = _this.finder(__dirname + '/templates');

      var dest = {};
          dest.app = path.join(process.cwd(), 'src/js/app');
          dest.modules = path.join(dest.app, 'modules');

      var flags = {};
          flags.module     = _this.util.env.m       || _this.util.env.module || false;
          flags.simple     = _this.util.env.simple  || false;
          flags.complex    = _this.util.env.complex || false;
          flags.menu       = _this.util.env.menu    || false;

      var prompts = questions(_this.args[0]);

      var filters = {};
          filters.complex   = false;
          filters.simple    = false;
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};

      var config = _this.storage.get();


      var defaults = {};


      var args = _this.args;

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.name = args[0];
        _this.names = _str.str().simple(_this.name);

        if(!flags.module){
          _this.prompts.push( prompts.module );
        }

        if(!flags.menu){
          _this.prompts.push( prompts.menu );
        }

        _this.prompts.push( prompts.routePath );

        if(!flags.complex && !flags.simple){
          _this.prompts.push( prompts.type );
        }



        if(_this.prompts[0].name === 'module'){
          _this.prompts[0].choices = findModules();
        }

        startPrompt( next );


        function next(answers){
          // console.log(filters);

          _.assign(filters, config);
          _.assign(filters, answers);
          filters.moduleNames = _str.str().simple( filters.module || answers.module );
          filters.names = _this.names;
          filters.menu = flags.menu || answers.menu;

          if(filters.moduleNames.slug === 'core'){
            dest.final = path.join(dest.app, 'core');
          } else {
            dest.final = path.join(dest.modules, filters.moduleNames.slug);
          }

          generate()
        }

      }

      function complex_prompt(answers, callback) {
        var tmpPrompts = [];
        answers.complex = true;

        tmpPrompts.push(prompts.viewName)
        tmpPrompts.push(prompts.controllerName)

        inquirer
          .prompt(tmpPrompts, function (nextAnswers){
            answers.viewNames       = _str.str().simple( nextAnswers.viewName );
            answers.controllerNames = _str.str().simple( nextAnswers.controllerName );

            callback(answers)

        });
      }

      function startPrompt(callback) {
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            if(chosen.module){finalAnswers.module = chosen.module}

            _this.prompts = [];
            _.assign(finalAnswers, chosen);
            finalAnswers.routePath = _str.str().simple( chosen.routePath );

            if(chosen.routeType === 'complex' || flags.complex){

              complex_prompt(finalAnswers, callback);

            } else {

              callback(finalAnswers)
            }

          })
      }


      function generate(){

        // console.log(filters);
        create_base();
        if(filters.complex) create_complex();
        console.log(filters)
        if(filters.menu) create_menu();

      }


      function create_base(){
        gulp
          .src( templates.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( rename( filters.names.slug ) ))
          .pipe( $.conflict( dest.final ))
          .pipe( gulp.dest( dest.final  ));
      }

      function create_complex(){
        gulp
          .src( templates.options.complex.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( rename( filters.names.slug ) ))
          .pipe( $.conflict( dest.final ))
          .pipe( gulp.dest( dest.final  ));
      }
      function create_menu(){
        gulp
          .src( templates.options.menu.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( rename( filters.names.slug ) ))
          .pipe( $.conflict( dest.final ))
          .pipe( gulp.dest( dest.final  ));
      }


      function findModules(){
        var array = [{value:'core',name:'core'}];
        var dirs = fs.readdirSync(dest.modules);
        getModules()
        return array;
        function getModules(){
          _.forEach(dirs, function (folder){
            var stat = fs.statSync(dest.modules + '/' + folder);
            if (stat.isDirectory()) {
              array.push({
                value: folder,
                name: folder
              });
            }
          });
        }
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
