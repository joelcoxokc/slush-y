(function(){
  'use strict';


  var fs = require('fs-extra');
  var _ = require('lodash');
  var gulp = require('gulp');
  var chalk = require('chalk');
  var $ = require('gulp-load-plugins')({lazy:false});
  var path = require('path')

  // var Modules = require('../../../config/modules.js');

  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */
  module.exports = function(gulp, inquirer, $, _, path, _str){
      // this.log('Registered  ['+this.green('sub-generator')+']:' + this.green( 'config' ))

      var slushy = this;

      // var controller = require('./controller.js');
      var prompts = require('./prompts')(slushy);
      // var templates = __dirname + '/templates/*.js';
      // var modulesDir = this.get('modulesDir');


      return gulp.task('config', slushy.task(Configuration));

      /**
       * [The Controller Generater will call this as a call back, and pass in a done method]
       * @param  {Function} done [call done() in order to stop the gulp stre]
       * @return {Promise} [Returns a promise that the gulprunner when the gulp runner is complete]
       */
      function Configuration (done, options){

        return slushy.ask(prompts, options)
          .then( slushy.use(runinplace) )
          .then( GenerateModuleName )
          .then( slushy.generate(GenerateTemplates) )
          .catch( done );
      }



      function GenerateTemplates( options ){

        gulp.src( options.src().scripts() )
          .pipe( $.template( options ))
          .pipe( $.rename(function ( file ) {
            file = slushy.processFile(true, file, options );
          }))
          .pipe( $.conflict( options.dest().final('config') ) )
          .pipe( gulp.dest( options.dest().final('config') ))


      }
      function GenerateModuleName(options){
        options.humanizedModuleName = _str.humanize(options.moduleName);
        return options;
      }
      function runinplace(options){
        console.log(options);
        return options;
      }


  }
})();