(function(){
  'use strict';
  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    var gulp  = require('gulp');
    var $     = require('gulp-load-plugins')({lazy: false});
    var _     = require('lodash');


    module.exports = function(opts){

        var __this = this;

        /**
         * Generator the server
         */
        gulp
          .src( opts.src('servers/**/*') )
            .pipe($.template( opts.application ))
            .pipe($.conflict('./'))
            .pipe(gulp.dest('./'));

        /**
         * Generate all static assets, and root level files
         */
        gulp
          .src( opts.src('static/**/*') )
            .pipe($.rename(function (file) {
                file = __this.processFile(false, file );
             }))
            .pipe($.template( opts.application ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './' ));

        /**
         * Generate client from chosen script directory type!
         */
        gulp
          .src( opts.src('clients/client/**/*') )
            .pipe($.rename(function ( file ) {
                file = __this.processFile(false, file );
             }))
            .pipe($.template( opts.application ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client' ))
        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        gulp
          .src( opts.src('clients/options'+ opts.application.httpType) )
            .pipe($.rename(function ( file ) {
                file = __this.processFile(false, file );
             }))
            .pipe($.template( __this ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client' ));

        // gulp
        //   .src(['./bower.json', 'package.json'])
        //   .pipe($.install());

    }
})();