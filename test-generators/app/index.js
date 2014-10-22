


(function(){
  'use strict';
  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

  module.exports = function(gulp, inquirer, $, _, path){

      this.log('Registered  ['+this._green('sub-generator')+']:' + this._green( 'default' ))

      var slushy        = this;
      var prompts       = require('./prompts');
      var templateDir  = __dirname + '/templates';

      // console.log('------', y.config)

      return gulp.task('default', slushy.flow(ApplicationGenerator, prompts));
      // slushy.flow(ApplicationGenerator));
      /**
       * [gulpRunner Gulp will call this as a call back, and pass in a done method]
       * @param  {Function} done [call done() in order to stop the gulp stre]
       * @return {Promise} [Returns a promise that the gulprunner when the gulp runner is complere]
       */
      function ApplicationGenerator (__end_of_stream, __slushy_stream){

        console.log('ApplicationGenerator')
        // slushy.log('Running  ['+slushy.blueB('sub-generator')+']:' + slushy.blueB( 'default' ))
        return slushy.src( __slushy_stream )
          .then( slushy.pipe(GenerateTemplates) )
          // .catch( __end_of_stream );
      }


      /**
       * [GenerateTemplates Generates all primary templates]
       * @param {[type]} values [description]
       */
      function GenerateTemplates( __end, _stream ){
          var __this = this;
          console.log(__this)
          this.info('Generating Templates using');
          this.log(this.templateDir)


          /**
           * Generator the server
           */
          gulp
            .src( __this.src().app().server() )
              .pipe($.template( __this ))
              .pipe($.conflict('./'))
              .pipe(gulp.dest('./'));

          /**
           * Generate all static assets, and root level files
           */
          gulp
            .src( __this.src().app().statics() )
              .pipe($.rename(function (file) {
                  file = __this.processFile(false, file );
               }))
              .pipe($.template( __this ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest( './' ));

          /**
           * Generate client from chosen script directory type!
           */
          gulp
            .src( __this.src().app().client() )
              .pipe($.rename(function ( file ) {
                  file = __this.processFile(false, file );
               }))
              .pipe($.template( __this ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest( __this.application.appDir ))
          /**
           * Generate client scritps from chosen HTTPrequest handler type
           */
          // console.log("Start===============")
          // console.log(values.httpType)
          // console.log("Stop===============")
          //
          // this.error(values.script)
          // this.error(values.httpType)
          gulp
            .src( __this.src().app().httpType() )
              .pipe($.rename(function ( file ) {
                  file = __this.processFile(false, file );
               }))
              .pipe($.template( __this ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest( __this.application.appDir ))

          // gulp
          //   .src(['./bower.json', 'package.json'])
          //   .pipe($.install());

      }
  }
})();