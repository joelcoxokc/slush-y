(function(){
  'use strict';

    var _    = require('lodash');
    var path = require('path');
    var gulp = require('gulp');
    /**
     * Factory Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */

    module.exports = function ( $, paths, filters, templates, slushy) {

        var __this = this;


        gulp.src( templates.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( __this.files().rename( filters.names.single.slug ) ))
          .pipe( $.conflict( paths.dest ))
          .pipe( gulp.dest( paths.dest  ));


        if( filters.answers.complex){ complex() };

        function complex () {

          gulp
            .src( templates.options.complex.all() )
            .pipe( $.template( filters ) )
            .pipe( $.rename( __this.files().rename( filters.names.single.slug ) ))
            .pipe( $.conflict( paths.dest ))
            .pipe( gulp.dest( paths.dest  ));
          //--------------------------------------
        }

    };

})();