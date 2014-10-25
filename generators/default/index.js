(function(){
  'use strict';
  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    var gulp  = require('gulp');
    // var $     = require('gulp-load-plugins')({lazy: false});
    var _     = require('lodash');


    module.exports = function( $, paths, filters, templates, sip){
      // console.log('From Generator', $)
      console.log('From Generator', sip.src().static())
    // };
    // module.exports = function(opts){}
    // function runGenerator(opts){

        var __this = this;


        // I want gulp plugins
        // I want easy access to the /templates dir
        // I want easy access to the options from /templates/clients/options dir
        // I want easy access to the options from /templates/clients dir
        // I want easy access to the options from /templates/servers/server dir
        // I want simple processFile command.
        // I need filters for the appName


        /**
         * Generator the server
         */
        gulp
          .src( sip.src().servers()  )
            .pipe($.template( sip.filters ))
            .pipe($.conflict('./'))
            .pipe(gulp.dest('./'));

        /**
         * Generate all static assets, and root level files
         */
        gulp
          .src( sip.src().static() )
            .pipe($.rename(function (file) {
                file = __this.processFile(false, file );
             }))
            .pipe($.template( sip.filters ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './' ));

        /**
         * Generate client from chosen script directory type!
         */
        gulp
          .src( sip.src().clients().client() )
            .pipe($.rename(function ( file ) {
                file = __this.processFile(false, file );
             }))
            .pipe($.template( sip.filters ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client' ))
        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        gulp
          .src( sip.src().clients().options( filters.httpType ) )
            .pipe($.rename(function ( file ) {
                file = __this.processFile(false, file );
             }))
            .pipe($.template( sip.filters() ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client' ));

        // gulp
        //   .src(['./bower.json', 'package.json'])
        //   .pipe($.install());

    }
})();