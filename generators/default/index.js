(function(){
  'use strict';

  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    var gulp  = require('gulp');
    var _     = require('lodash');

    module.exports = function( $, paths, filters, templates, slushy){

        var __this = this;
        // console.log(slushy)
        /**
         * Generator the server
         */
        gulp
          .src( templates.server.base.all() )
            .pipe($.template( filters ))
            .pipe($.conflict('./server') )
            .pipe( gulp.dest('./server') )

        /**
         * Generate all static assets, and root level files
         */
        gulp
          .src( templates.static.base.all() )
            .pipe($.rename( __this.files().replace ) )
            .pipe($.template( filters ))
            .pipe($.conflict('./') )
            .pipe( gulp.dest( './') )

        /**
         * Generate client from chosen script directory type!
         */
        gulp
          .src( templates.client.base.all() )
            .pipe($.rename( __this.files().replace ) )
            .pipe($.template( filters ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client/app' ))
        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        gulp
          .src( templates.client.options[filters.httpType].all() )
            .pipe($.rename( __this.files().replace ) )
            .pipe($.template( filters ))
            .pipe($.conflict('./'))
            .pipe( gulp.dest( './client/app' ));

        // gulp
        //   .src('./bower.json')
        //   .pipe($.install());

    }
})();