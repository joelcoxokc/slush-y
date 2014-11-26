(function(){
  'use strict';

    var _    = require('lodash');
    var path = require('path');
    var gulp = require('gulp');
    /**
     * Factory Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */

    module.exports = function ( slushy, config, filters, templates, $, _) {

        var _this = this;

        if( filters.answers.complex){ complex() };

        generate();
        complex();

        //////////////////////

        function generate(){
          gulp.src( templates.base.all() )
            .pipe( $.template( filters ) )
            .pipe( $.rename( _this.files().rename( filters.names.single.slug ) ))
            .pipe( $.conflict( _this.modulePath ))
            .pipe( gulp.dest( _this.modulePath  ));

        }


        function complex () {

          gulp
            .src( templates.options.complex.all() )
            .pipe( $.template( filters ) )
            .pipe( $.rename( _this.files().rename( filters.names.single.slug ) ))
            .pipe( $.conflict( _this.modulePath ))
            .pipe( gulp.dest( _this.modulePath  ));
          //--------------------------------------
        }

    };

})();