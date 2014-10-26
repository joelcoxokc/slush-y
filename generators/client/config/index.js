(function(){
  'use strict';


  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( $, paths, filters, templates, generator) {

    var __this = this;
    console.log(filters);
    gulp.src( templates.base.all  )
      .pipe( $.template( filters ))
      .pipe( $.rename( __this.files(filters.moduleNames.slug).rename ) )
      .pipe( $.conflict( paths.dest ) )
      .pipe( gulp.dest( paths.dest )  )
  };

})();