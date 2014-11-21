(function(){
  'use strict';


  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( slushy, config, filters, templates, $, _) {
    var _this = this;

    generate();
    /////////////////////

    function generate(){

      gulp.src( templates.base.all()  )
        .pipe( $.template( filters ))
        .pipe( $.rename( _this.files().rename(filters.moduleNames.slug) ) )
        .pipe( $.conflict( _this.modulePath ) )
        .pipe( gulp.dest( _this.modulePath )  )
    }
  };

})();