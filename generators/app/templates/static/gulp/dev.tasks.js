(function(){
'use strict';
  var wiredep = require('wiredep');

  module.exports = function($, client, tmp, gulp){

    var tasks = {
      server:   server,
      watch:    watch,
      scripts:  scripts,
      stylus:   stylus,
      inject:   inject,
      bower:    bower
    };

    var options = {
      inject: {
        core: { addRootSlash:false, name: 'core', relative: true },
        modules: { addRootSlash:false, name: 'modules', relative: true },
        styles: { addRootSlash:false, name: 'styles', relative: true }
      }
    };


    return tasks;


    /////////////////////


    function server(){
      process.env.NODE_ENV = 'development';
      // return g.nodemon('./server');
      require('../server');
      return
    }

    function watch(){
      var server = $.livereload();
      $.livereload.listen()


      gulp.watch('../client/app/**/*.js').on('change', function(file) {
        console.log('Changed', file)
        server.changed(file.path);
      });

      gulp.watch('./client/app/core/**/*.styl', ['stylus:dev'], server.changed)

      gulp.watch(['../client/app/**/*.html', './client/index.html']).on('change', function(file) {
        console.log('Changed', file)
        server.changed(file.path);
      });
      gulp.watch('../client/app/**/*.css').on('change', function(file) {
        console.log('Changed', file)
        server.changed(file.path);
      });
    }

    function scripts(){

       return gulp.src( client.scripts )
        .pipe( $.jshint() )
        .pipe( $.jshint.reporter('jshint-stylish'))
    }
    function stylus(){
      return gulp.src(client.stylus)
        .pipe($.stylus())
        .pipe($.rename('material-styles.css'))
        .pipe(gulp.dest(client.stylusDest))
    }

    function inject(){

      var core = gulp.src( client.core, {read:false} );
      var modules = gulp.src( client.modules, {read:false} );
      var styles = gulp.src( client.styles, {read:false} );

      return gulp.src( client.index )
        .pipe( $.inject( core, options.inject.core ) )
        .pipe( $.inject( modules, options.inject.modules ) )
        .pipe( $.inject( styles, options.inject.styles ) )
        .pipe( gulp.dest( client.root ) )
    }

    function bower(){

      var wire = wiredep.stream;

      return gulp.src( client.index )
        .pipe( wire({
          directory: client.bower
        }))
        .pipe( gulp.dest( client.root ) );
    }

  }
})();