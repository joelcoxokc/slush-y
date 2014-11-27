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
          flags.fields  = _this.argv.f || _this.argv.fields;
          flags.module  = _this.argv.m || _this.argv.module;


      var prompts = questions();

      var filters = {};
          filters.module    = null;
          filters.appName   = null;
          filters.names     = {};

      var config = _this.storage.get();

      var defaults = {};
          defaults.fields = [{key:'created', val:'Date'},{key:'title', val:'String'},{key:'content', val:'String'}];

      var args = _this.args;

      var dest = {};
          dest.app = path.join(process.cwd(), 'client/app');
          dest.modules = path.join(dest.app, 'modules');
          dest.api = path.join(process.cwd(), 'server/api/', _this.names.single.slug )

      /////////////////////

      init( function (){
        done();
      });

      /////////////////////

      function init(cb){


        filters.fields = parseArgs( flags.fields );
        filters.module = flags.module

        if(_.isEmpty(filters.module)){
          _this.prompts.push( prompts.module )
        }
        if(_.isEmpty(filters.fields)){
          _this.prompts.push( prompts.fields )
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

          filters.names = _this.names;

          var fields = parseArgs( answers.fields );
          if(fields){
            filters.fields = fields;
          }

          if(_.isEmpty(filters.fields)){
            filters.fields = defaults.fields;
          }

          if(filters.moduleNames.slug === 'core'){
            dest.final = path.join(dest.app, 'core');
          } else {
            dest.final = path.join(dest.modules, filters.moduleNames.slug);
          }

          generate();
        }


      }

      function startPrompt(callback){
        inquirer
          .prompt(_this.prompts, function (chosen){
            var finalAnswers = {};
            if(chosen.fields ){finalAnswers.fields = chosen.fields }
            if(chosen.module ){finalAnswers.module = chosen.module }

            callback(finalAnswers);
          })
      }

      function generate(){
        create_server_module();
        create_client_api();
      }

      function create_server_module() {

        gulp
          .src( templates.server.base.api.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  rename( filters.names.single.slug )))
          .pipe( $.conflict( dest.api ) )
          .pipe( gulp.dest( dest.api  ) );
      }

      function create_client_api(){

        gulp
          .src( templates.client.options[filters.httpType].all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  rename( filters.names.slug )  )  )
          .pipe( $.conflict( dest.final ) )
          .pipe( gulp.dest( dest.final  ) );
      }

      function rename ( name ) {
        return function (file){
          if (file.basename.indexOf('_') == 0) {
            file.basename = file.basename.replace('_', name);
          }
        };
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
      function parseArgs(values){
        if(_.isEmpty(values) ) return false;
        if(_.isString( values )){
          values = values.split(',');
        }
        return _.map(values, function (item){
          var split = item.split(':');
          return {key:split[0], val: split[1]};
        });
      }

    };


})();
