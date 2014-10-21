


(function(){
  'use strict';
  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

  module.exports = function(gulp, inquirer, $, _, path){

      this.success('THIS is == an instance of Slushy')

      var slushy        = this;
      var prompts       = require('./prompts');
      var templateDir  = __dirname + '/templates';

      // console.log('------', y.config)

      return gulp.task('default', gulpRunner);

      /**
       * [gulpRunner Gulp will call this as a call back, and pass in a done method]
       * @param  {Function} done [call done() in order to stop the gulp stre]
       * @return {Promise} [Returns a promise that the gulprunner when the gulp runner is complere]
       */
      function gulpRunner (){
        slushy.info('Running Application Generator')
        return slushy.ask(prompts)
          .then( function (options){
            slushy.use(GenerateTemplates, options);
          });
          // .then(GenerateTemplates)
      }


      /**
       * [GenerateTemplates Generates all primary templates]
       * @param {[type]} values [description]
       */
      function GenerateTemplates( values ){
          this.info('Generating Templates using');
          this.log(this.templateDir)

          /**
           * Generator the server
           */
          gulp
            .src( templateDir + '/servers/**/*' )
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe(gulp.dest('./'));

          /**
           * Generate all static assets, and root level files
           */
          gulp
            .src(templateDir + '/static/**/*')
              .pipe($.rename(function (file) {
                  file = slushy.processFile(false, file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./'));

          /**
           * Generate client from chosen script directory type!
           */
          gulp
            .src(templateDir + '/clients/client/**/*')
              .pipe($.rename(function ( file ) {
                  file = slushy.processFile(false, file );
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
          //
          this.error(values.script)
          this.error(values.httpType)
          gulp
            .src(templateDir + '/clients/options/'+values.httpType+'/**/*')
              .pipe($.rename(function ( file ) {
                  file = slushy.processFile(false, file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./client/app'))

          // gulp
          //   .src(['./bower.json', 'package.json'])
          //   .pipe($.install());

      }
  }
})();