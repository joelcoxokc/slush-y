(function(){
  'use strict';
  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( $, paths, filters, templates, slushy) {

    var __this    = this;

    var modulePath    = path.join( paths.modulesDir, slushy.title, 'directives' );
    var directivePath = path.join( modulePath, filters.names.single.camel );
    filters.directive_view_path = path.join( directivePath, filters.names.single.camel + '.directive.view.html' );

    if(filters.answers.simple)  { simple();  }
    if(filters.answers.complex) { complex(); }
    ////////////////////////////////////

    function simple(){
      gulp
        .src( templates.options.simple.all() )
        .pipe( $.template( filters ) )
        .pipe( $.rename( __this.files().rename(filters.names.single.camel) ) )
        .pipe( gulp.dest( directivePath ) );
    }

    function complex(){
      gulp
        .src( templates.options.complex.all() )
        .pipe($.template(filters) )
        .pipe($.rename( __this.files().rename(filters.names.single.camel) ))
        .pipe(gulp.dest( directivePath ));
    }

  }
})();