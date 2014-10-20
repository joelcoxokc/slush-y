


(function(){
  'use strict';

  var fs = require('fs-extra');
  var _ = require('lodash');
  var gulp = require('gulp');
  var chalk = require('chalk');
  var $ = require('gulp-load-plugins')({lazy:false});


  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */
  module.exports = function(slushy){

      console.log(':-->enter Default index.js', _.functions(slushy))

      var slushy = this;
      var done
      var values = {};
      var prompts       = require('./prompts')
      var controller    = require('./controller.js');
      var templatePath  = __dirname + '/templates/';

      // console.log('------', y.config)
      console.log(slushy)

      return gulp.task('default', gulpRunner)



      /**
       * [gulpRunner Gulp will call this as a call back, and pass in a done method]
       * @param  {Function} done [call done() in order to stop the gulp stre]
       * @return {Promise} [Returns a promise that the gulprunner when the gulp runner is complere]
       */
      function gulpRunner (done){

        // console.log(_.functions(y))
        return controller.ask(prompts)
          .then( function (answers){
            console.log(answers,"inside the gernerator")
            return answers;
          })
          .then( controller.initConfig )
          .then( GenerateTemplates )
          .catch( done )
          // .then(GenerateTemplates)
      }


      /**
       * [GenerateTemplates Generates all primary templates]
       * @param {[type]} values [description]
       */
      function GenerateTemplates( values ){
          console.log(':--> Entering Generate Templates.')

          /**
           * Generator the server
           */
          gulp
            .src(templatePath + 'servers/**/*')
              .pipe($.rename( function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe(gulp.dest('./'));

          /**
           * Generate all static assets, and root level files
           */
          gulp
            .src(templatePath + 'static/**/*')
              .pipe($.rename(function (file) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./'));

          /**
           * Generate client from chosen script directory type!
           */
          gulp
            .src(templatePath + 'clients/'+values.script+'/client/**/*')
              .pipe($.rename(function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./client/app'))


          /**
           * Generate client scritps from chosen HTTPrequest handler type
           */
          // console.log("Start===============")
          // console.log(values.httpType)
          // console.log("Stop===============")
          gulp
            .src(templatePath + 'clients/'+values.script+'/options/'+values.httpType+'/**/*')
              .pipe($.rename(function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./client/app'))
              .pipe($.install())
      }
  }
})();