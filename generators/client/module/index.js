(function(){
  'use strict';
  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');

  module.exports = function ( $, paths, filters, templates, slushy) {

    var __this    = this;


    ////////////////////////////////////

    var modulePath = path.join( paths.modulesDir, filters.moduleNames.slug );
    __this.mkdirp( modulePath )
    // console.log(modulePath);
    _(slushy.answers.folders).forEach(function (item){
      __this.mkdirp(path.join( modulePath, item));
    })
    // console.log(slushy)

    gulp
      .src( templates.base.all )
      .pipe($.template(filters) )
      .pipe($.rename( __this.files(filters.moduleNames).rename ))
      .pipe(gulp.dest( modulePath ));



    function setModuleName( options ){
      options.moduleName = options.name;
      return options;
    }

  }
})();