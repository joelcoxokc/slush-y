(function(){
  'use strict';

    var _    = require('lodash');
    var path = require('path');
    var gulp = require('gulp');
    var fs   = require('fs.extra');
    /**
     * Factory Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */

    module.exports = function ( $, paths, filters, templates, slushy) {

        var __this = this;


        var modelFilePath = path.join( paths.dest, filters.names.single.slug +'.model.js' );
        if (!fs.existsSync(modelFilePath)) { generate_server_model(); }


        gulp.src( templates.base.any('*.model.test.js') )
          .pipe( $.template( filters ) )
          .pipe( $.rename( __this.files().rename( filters.names.single.slug ) ))
          .pipe( $.conflict( paths.dest ))
          .pipe( gulp.dest( paths.dest ));


        function generate_server_model(){

          gulp.src( templates.base.all() )
            .pipe( $.template( filters ) )
            .pipe( $.rename( __this.files().rename( filters.names.single.slug ) ))
            .pipe( $.conflict( paths.dest ))
            .pipe( gulp.dest( paths.dest ));
        }
    };

})();