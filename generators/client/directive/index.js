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
          filters.simple    = _this.flags.simple;
          filters.complex   = _this.flags.complex;


      var defaults = {};
          defaults.functions = ['actionOne', 'actionTwo'];
          defaults.providers = [];

      var args = _this.args;

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////


      function init(cb){
        _this.name = _this.args[0];
        _this.names = _this.str.simple(_this.name);

        _.forEach(_this.flags, function (flag, key){
          // console.log(flag, key);
          if(_.isEmpty(flag)){
            if(prompts[key]){
              _this.prompts.push( prompts[key] )
            }
          } else {
            filters[key] = flag;
          }
        });


        if(filters.complex) filters.type = 'complex';
        if(filters.simple)  filters.type = 'simple';
        /**
         * Add the prompt for choosing complex or simple
         */
        if(!filters.type){

          _this.prompts.push( prompts.type );
        }

        if(_.size( _this.prompts )){
          if(_this.prompts[0].name === 'module'){
            _this.prompts[0].choices = findModules();
          }
          startPrompt( next );

        } else {

          next({});

        }

        function next(answers){
          filters.moduleNames = _this.str.simple( filters.module || answers.module );
          _.assign(filters, _this.config);
          _.assign(filters, answers);
          filters.names = _this.names;

          if(filters.complex) filters.type = 'complex';
          if(filters.simple)  filters.type = 'simple';

          if(_.isEmpty(filters.functions)){
            filters.functions = defaults.functions;
          }
          // console.log(filters.providers)
          if(_.isEmpty(filters.providers)){
            filters.providers = defaults.providers;
          }

          if(filters.moduleNames.slug === 'core'){
            _this.cwd.final = path.join(_this.cwd.app, 'core', 'directives', filters.names.camelized);
          } else {
            _this.cwd.final = path.join(_this.cwd.modules, filters.moduleNames.slug, 'directives', filters.names.camelized);
          }



          var directivePath = path.join( 'app/modules',  filters.moduleNames.slug, 'directives', filters.names.camelized );
          filters.directive_view_path = path.join( directivePath, filters.names.camelized + '.view.html' );

          generate()
        }


      }


      function startPrompt(callback){
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            if(chosen.directiveType) {finalAnswers.type = chosen.directiveType};
            if(chosen.providers ){finalAnswers.providers = chosen.providers.split(",")}
            if(chosen.functions ){finalAnswers.functions = chosen.functions.split(",")}
            if(chosen.module){finalAnswers.module = chosen.module}
            callback(finalAnswers)
          })
      }


      function generate(){
        gulp.src( _this.templates.options[filters.type].all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( _this.fs.rename(_this.names.camelized) ))
          .pipe( $.conflict( _this.cwd.final ))
          .pipe( gulp.dest( _this.cwd.final  ))
      }

    };


})();
