(function(){
  'use strict';
  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( slushy, config, filters, templates, $, _ ) {

    var _this = this;

    console.log('Generating Module ' + _this.title);

    folders();
    base();
    ////////////////////////////////////


    function folders(){
      gulp
        .src( templates.options.dirs( filters.folders ) )
        .pipe( gulp.dest(  _this.modulePath) );
    }

    function base(){
      gulp
        .src( templates.base.all() )
        .pipe($.template(filters) )
        .pipe($.rename( _this.files().rename(filters.moduleNames.slug) ))
        .pipe(gulp.dest( _this.modulePath ));
    }

  }
})();