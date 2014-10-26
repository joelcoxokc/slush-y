(function(){
  'use strict';
  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( $, paths, filters, templates, slushy) {

    var __this    = this;
    // console.log(templates);

    ////////////////////////////////////

    var modulePath = path.join( paths.modulesDir, slushy.title );
    // console.log(modulePath);
    // __this.mkdirp( modulePath )
    // console.log(modulePath);
    // var glob = _.map(filters.answers.folders, function (value, key) { return value} );

      // console.log( glob );

    // _(filters.answers.folders).forEach(function (item){
      // __this.mkdirp(path.join( modulePath, item));
    // })

    gulp
      .src( templates.options.pattern(  filters.answers.folders  ) )
      .pipe( gulp.dest(  modulePath) );

    gulp
      .src( templates.base.all )
      .pipe($.template(filters) )
      .pipe($.rename( __this.files().rename(filters.moduleNames.slug) ))
      .pipe(gulp.dest( modulePath ));




    function setModuleName( options ){
      options.moduleName = options.name;
      return options;
    }

  }
})();