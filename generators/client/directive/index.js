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

      var templates = {};
          templates.complex = {}
          templates.simple = {}

          templates.complex.path = path.join(__dirname+'', 'templates', 'options', 'complex');
          templates.simple.path = path.join(__dirname+'', 'templates', 'options', 'simple');

          templates.complex.all  = path.join( templates.complex.path, '**/*' );
          templates.simple.all  = path.join( templates.simple.path, '**/*' );

      var dest = {};
          dest.app = path.join(process.cwd(), 'client/app');
          dest.modules = path.join(dest.app, 'modules');

      var flags = {};
          flags.module    = _this.util.env.m || _this.util.env.module    || [];
          flags.providers = _this.util.env.p || _this.util.env.providers || [];
          flags.functions = _this.util.env.f || _this.util.env.functions || [];
      var prompts = questions();


      var filters = {};
          filters.providers = [];
          filters.functions = [];
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};
          filters.simple    = _this.util.env.simple  || false;
          filters.complex   = _this.util.env.complex || false;

      var config = _this.storage.get();



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
        _this.name = args[0];
        _this.names = _str.str().simple(_this.name);

        _.forEach( flags, function (flag, key){
          if(_.isEmpty(flag)){
            _this.prompts.push( prompts[key] )
          } else if(_.isString( flag )) {
            if(key === 'module'){
              filters[key] = flag;
            } else {
              filters[key] = flag.split(',');

            }
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
          filters.moduleNames = _str.str().simple( filters.module || answers.module );
          _.assign(filters, config);
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
            dest.final = path.join(dest.app, 'core', 'directives', filters.names.camelized);
          } else {
            dest.final = path.join(dest.modules, filters.moduleNames.slug, 'directives', filters.names.camelized);
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
            finalAnswers.type = chosen.directiveType;
            if(chosen.providers ){finalAnswers.providers = chosen.providers.split(",")}
            if(chosen.functions ){finalAnswers.functions = chosen.functions.split(",")}
            if(chosen.module){finalAnswers.module = chosen.module}
            callback(finalAnswers)
          })
      }


      function generate(){
        gulp.src( templates[filters.type].all )
          .pipe( $.template( filters ) )
          .pipe( $.rename(function (file){
            if (file.basename.indexOf('_') == 0) {
              file.basename = file.basename.replace('_', _this.names.camelized);
            }
          }))
          .pipe( $.conflict( dest.final ))
          .pipe( gulp.dest( dest.final  ))
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

    };


})();
