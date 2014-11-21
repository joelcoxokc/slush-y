(function(){

    var gulp        = require('gulp');
    var $           = require('gulp-load-plugins')({lazy: false});
    var noop        = $.util.noop;
    var es          = require('event-stream');
    var bowerFiles  = require('main-bower-files');
    var rimraf      = require('rimraf');
    var stylish     = require('jshint-stylish');
    var bower       = require('./bower');
    var util        = require('util');
    var del         = require('del');
    var karma       = require('karma').server;
    var mainBowerFiles = require('main-bower-files');
    var wiredep     = require('wiredep');
    // GULP PATHS
    var errorHandler= require('./gulp/errors');
    // var client      = config.client;
    // var tmp         = config.build;
    // var dist        = config.dist;
    var AUTOPREFIXER_BROWSERS = [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ];


    /*
     | ###################################
     |
     | GULP - Every task is listed in the order it is called;
     |
     | NOTE: Tasks that are long are call are wrapped in functions that are listed near the bottom
     |       The purpose of this is to help beiginners approach overwhelming gulp files
     |
     | ###################################
     */

    var client = {
      moduleName: 'asd',
      root: './client',
      index: './client/index.html',
      app: './client/app',
      scripts: ['./client/app/**/*.js', '!**/*.spec.js', '!**/*.test.js'],
      core: ['./client/app/app.js', './client/app/core/**/*.js', './client/app/authentication/**/*.js', '!**/*.spec.js', '!**/*.test.js'],
      modules: ['./client/app/modules/**/*.js', '!**/*.spec.js', '!**/*.test.js'],
      styles: './client/app/**/*.css',
      bower: './client/bower_components',
      templates: ['./client/**/*.html','!./client/index.html'],
      images: ['./client/app/**/*.png', './client/app/**/*.gif', './client/app/**/*.jpeg','./client/app/**/*.jpg'],
      specs: ['./client/app/app.js', './client/app/**/*.js', './client/app/**/*.html']

    };
    var tmp = {
      app: './.tmp/app',
      bower: './.tmp/bower'
    };
    var dist = {
      root: './dist',
      index: './dist/index.html',
      app: './dist/app',
      scripts: ['./dist/app/app.js', './dist/app/templates.js'],
      styles: './dist/styles',
      images: './dist/images',
      bower: './dist/bower_components'
    }

    var tasks = {
      dev: require('./gulp/dev.tasks.js')($, client, tmp, gulp),
      dist: require('./gulp/dist.tasks.js')($, client, tmp, dist, gulp),
      util: require('./gulp/util.tasks.js')($, client, tmp, dist, gulp),
      test: require('./gulp/test.tasks.js')($, client, tmp, dist, gulp)
    }



    /*
     | default
     */
    gulp
      .task('default', ['build:all'])
      .task('build:all', $.sequence('cleaner', 'build:dist', 'build:dev'))

    /**
     * dev: = all tasks for development env
     */

    gulp
      .task('dev', $.sequence('cleaner', 'build:dev', 'server:dev', 'watch'))
      .task('server:dev', tasks.dev.server)
      .task('watch', tasks.dev.watch)

    gulp
      .task('build:dev', $.sequence('scripts:dev', 'inject:dev', 'bower:dev'))
      .task('scripts:dev', tasks.dev.scripts)
      .task('inject:dev', tasks.dev.inject)
      .task('bower:dev', tasks.dev.bower)

    /*
     | static = build:production, run static production server
     */

    gulp
      .task('dist', $.sequence('cleaner', 'build:dist', 'server:dist'))
      .task('server:dist', tasks.dist.server);

    /*
     | build:production = scripts:prod, styles:prod, templates:prod, assets:prod, inject
     */

    gulp
      .task('build:dist', $.sequence(['scripts:dist', 'stylus:dist', 'styles:dist', 'templates:dist', 'assets:dist'],'inject:dist'))
      .task('scripts:dist', tasks.dist.scripts)
      .task('stylus:dist', tasks.dist.stylus)
      .task('styles:dist', tasks.dist.styles)
      .task('templates:dist', tasks.dist.templates)

    gulp
      .task('assets:dist', ['copy','images','bower:dist'])
      .task('copy', tasks.dist.copy)
      .task('images', tasks.dist.images)
      .task('bowerFiles:dist', tasks.dist.bowerFiles)
      .task('bower:dist', ['bowerFiles:dist'], tasks.dist.bower)
      .task('inject:dist', tasks.dist.inject)

    gulp
      .task('cleaner',['clean'], tasks.util.cleaner)
      .task('clean', del.bind(null, ['./.tmp', './dist']));


    gulp
      .task('test', $.sequence('karma:inject'))
      .task('karma:inject', karmaInject)




    function karmaInject(){
      var bower = mainBowerFiles({
        paths: {
          bowerrc: './.bowerrc',
          bowerJson: './bower.json',
          includeDev: true
        }
      })
      // var tmpBower = gulp.src('./.tmp/bower/*.js');
      return gulp.src('./karma.conf.js')
        // .pipe(gulp.dest( tmp.bower ))
        .pipe( $.inject( gulp.src(bower), {
          starttag: '/* @bower */',
          endtag: '/* @end:bower */',
          addRootSlash: false,
          transform: function (filepath, file, i, length) {
            return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
          }
        }))
        .pipe( $.inject( gulp.src(client.specs), {
            starttag: '/* @client */',
            endtag: '/* @end:client */',
            addRootSlash: false,
            transform: function (filepath, file, i, length) {
              return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
            }
          }
        ))
        .pipe( gulp.dest('./') );
    }

})();