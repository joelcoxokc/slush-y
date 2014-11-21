(function(){
  'use strict';
  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( slushy, config, filters, templates, $, _) {

    var _this    = this;


    var directivePath = path.join( _this.modulePath, 'directives', filters.names.single.camel );
    filters.directive_view_path = path.join( directivePath, filters.names.single.camel + '.directive.view.html' );

    /*I AM HERE*/

    if(filters.simple)  { simple();  }
    if(filters.complex) { complex(); }

    ////////////////////////////////////

    function simple(){
      gulp
        .src( templates.options.simple.all() )
        .pipe( $.template( filters ) )
        .pipe( $.rename( _this.files().rename(filters.names.single.camel) ) )
        .pipe( gulp.dest( directivePath ) );
    }

    function complex(){
      gulp
        .src( templates.options.complex.all() )
        .pipe($.template(filters) )
        .pipe($.rename( _this.files().rename(filters.names.single.camel) ))
        .pipe(gulp.dest( directivePath ));
    }

  }
})();;