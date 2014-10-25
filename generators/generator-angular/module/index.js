(function(){
  'use strict';


  module.exports = function ( $, paths, filters, templates, slushy) {

    var __this    = this;


    ////////////////////////////////////

      // _(options.folders).forEach(function (item){
      //   slushy.info('creating', slushy.path(options.moduleDir, item))
      //   slushy.mkdir(path.join( options.moduleDir, item));
      // })
      console.log(paths)

      // gulp
      //   .src(  )
      //   .pipe($.template(options))
      //   .pipe($.rename( __this.files().rename(filters.app_names) )
      //   .pipe(gulp.dest(  ));



    function setModuleName( options ){
      options.moduleName = options.name;
      return options;
    }

  }
})();