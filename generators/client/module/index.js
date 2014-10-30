(function(){
  'use strict';
  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( $, paths, filters, templates, slushy) {

    var __this    = this;

    ////////////////////////////////////

    var modulePath = path.join( paths.modulesDir, slushy.title );

    gulp
      .src( templates.options.dirs( filters.answers.folders ) )
      .pipe( gulp.dest(  modulePath) );

    gulp
      .src( templates.base.all() )
      .pipe($.template(filters) )
      .pipe($.rename( __this.files().rename(filters.moduleNames.slug) ))
      .pipe(gulp.dest( modulePath ));

  }
})();