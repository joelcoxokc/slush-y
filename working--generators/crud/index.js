;(function(){

  'use strict';

  var _    = require('lodash');
  var path = require('path');
  var gulp = require('gulp');
  // var builder = require('../../slushy/Generator/util/builder.js');

  module.exports = function ( $, paths, filters, templates, slushy) {
    console.log(filters)
      var __this = this;

      // var templates  = generator.buildTemplates();
      var modulePath = path.join( paths.modulesDir, slushy.title );
      var apiPath    = path.join( paths.serverDir, 'api', filters.names.single.slug );

      create_selected_folders();
      create_server_module();
      create_client_module();
      create_client_module_options();

      function create_selected_folders() {

        gulp
          .src( templates.client.folders.dirs( filters.answers.folders ) )
          .pipe( gulp.dest( modulePath ) );
      }

      function create_server_module() {

        gulp
          .src( templates.server.base.api.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  __this.files().rename( filters.names.single.slug )  )  )
          .pipe( $.conflict( apiPath ) )
          .pipe( gulp.dest( apiPath  ) );
      }

      function create_client_module() {

        gulp
          .src( templates.client.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  __this.files().rename( filters.names.plural.slug )  )  )
          .pipe( $.conflict( modulePath ) )
          .pipe( gulp.dest( modulePath  ) );
      }

      function create_client_module_options(){

        gulp
          .src( templates.client.options[filters.httpType].all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename(  __this.files().rename( filters.names.plural.slug )  )  )
          .pipe( $.conflict( modulePath ) )
          .pipe( gulp.dest( modulePath  ) );
      }
  }
})();

