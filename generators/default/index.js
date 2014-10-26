(function(){
  'use strict';

  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    var gulp  = require('gulp');
    // var $     = require('gulp-load-plugins')({lazy: false});
    var _     = require('lodash');


    module.exports = function( $, paths, filters, templates, slushy){
      // console.log('From Generator', $)
      // console.log('From Generator', slushy)
    // };
    // function runGenerator(opts){

        var __this = this;


        /**
         * Generator the server
         */
        gulp
          .src( slushy.src().servers()  )
            .pipe($.template( slushy.filters ))
            .pipe($.conflict('./') )
            .pipe( gulp.dest('./') )

        /**
         * Generate all static assets, and root level files
         */
        gulp
          .src( slushy.src().static() )
            .pipe($.rename( __this.files().replace ) )
            .pipe($.template( slushy.filters ))
            .pipe($.conflict('./') )
            .pipe( gulp.dest( './') )

        /**
         * Generate client from chosen script directory type!
         */
        gulp
          .src( slushy.src().clients().client() )
            .pipe($.rename( __this.files().replace ) )
            .pipe($.template( slushy.filters ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client/app' ))
        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        gulp
          .src( slushy.src().clients().options( filters.httpType ) )
            .pipe($.rename( __this.files().replace ) )
            .pipe($.template( slushy.filters ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client' ));

        // gulp
        //   .src(['./bower.json', 'package.json'])
        //   .pipe($.install());

    }
})();