(function(){
  'use strict';

  var wiredep = require('wiredep');
  module.exports = function($, client, tmp, dist, gulp){


    var tasks = {
      server:     server,
      scripts:    scripts,
      styles:     styles,
      templates:  templates,
      copy:       copy,
      images:     images,
      bower:      bower,
      bowerFiles: bowerFiles,
      inject:     inject
      // assets:
    };

    var options = {
      inject: {
        scripts: { addRootSlash:false, name: 'core', relative: true },
        styles: { addRootSlash:false, name: 'styles', relative: true }
      }
    };


    return tasks;


    /////////////////////////


    function server(){

      process.env.NODE_ENV = 'production';
      require('../server');
    }

    function scripts(){

      return gulp.src( client.scripts )
        .pipe( $.jshint() )
        // .pipe( $.jshint.reporter('jshint-stylish'))
        .pipe( $.concat( 'app.js' ) )
        .pipe( $.ngAnnotate( {add: true} ) )
        .pipe( $.uglify() )
        .pipe( gulp.dest( dist.app ) )
    }

    function styles(){

      return gulp.src( client.styles )
        // .pipe( g.autoprefixer( {browsers: AUTOPREFIXER_BROWSERS} ) )
        .pipe( $.concat( 'app.css' ) )
        // .pipe( g.if('*.css', g.csso() ) )
        .pipe( gulp.dest( dist.styles ) );
    }

    function templates(){

      return gulp.src( client.templates )
        .pipe( $.angularTemplatecache( 'templates.js', { module: client.moduleName } ) )
        // .pipe( g.uglify() )
        .pipe( gulp.dest( dist.app ) );
    }

    function copy(){

      return gulp.src([
          client.root + '/*.*'
          ,'node_modules/apache-server-configs/dist/.htaccess']
          ,{dot: true}
        )
        .pipe( gulp.dest( dist.root ) );
    }

    function images(){

      return gulp.src( client.images )
        .pipe( $.cache( $.imagemin({
          progressive: true,
          interlaced: true
        })))
        .pipe( gulp.dest( dist.images ) );
    }

    function bower(){

      var wire = wiredep.stream;
      return gulp.src( dist.index )
        .pipe( wire({
          directory: dist.bower,
        }))
      .pipe( gulp.dest( dist.root ) );
    }

    function bowerFiles(){

      return $.bower( client.bower )
        .pipe( gulp.dest( dist.bower ) );
    }

    function inject(){

      var styles = gulp.src( dist.styles + '/**/*.css', {read:false} );
      var scripts = gulp.src( dist.scripts, {read:false} );

      return gulp.src( dist.index )
        .pipe( $.inject( scripts, options.inject.scripts ) )
        .pipe( $.inject( styles, options.inject.styles ) )
        .pipe( gulp.dest( dist.root ) );
    }


  };

})();