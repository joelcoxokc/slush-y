var gulp        = require('gulp');
var g           = require('gulp-load-plugins')({lazy: false});
var noop        = g.util.noop;
var es          = require('event-stream');
var bowerFiles  = require('main-bower-files');
var rimraf      = require('rimraf');
var queue       = require('streamqueue');
var lazypipe    = require('lazypipe');
var stylish     = require('jshint-stylish');
var bower       = require('./bower');
var util        = require('util');
var browserSync = require('browser-sync');
var del         = require('del');
var karma       = require('karma').server;
var mainBowerFiles = require('main-bower-files');
var reload      = browserSync.reload;
var wiredep     = require('wiredep');
// GULP PATHS
var errorHandler= require('./build/errors');
var config      = require('./build/config');
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
  moduleName: '<%= slugifiedAppName %>',
  root: './client',
  index: './client/index.html',
  app: './client/app',
  scripts: ['./client/app/**/*.js', '!**/*.spec.js', '!**/*.test.js'],
  core: ['./client/app/app.js', './client/app/core/**/*.js', './client/app/authentication/**/*.js', '!**/*.spec.js', '!**/*.test.js'],
  modules: ['./client/app/modules/**/*.js', '!**/*.spec.js', '!**/*.test.js'],
  styles: './client/app/**/*.css',
  bower: './client/bower_components',
  templates: ['./client/**/*.html','!./client/index.html'],
  images: ['./client/app/**/*.png', './client/app/**/*.gif', './client/app/**/*.jpeg','./client/app/**/*.jpg']

};
var tmp = {
  app: './.tmp/app'
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
/*
 | default
 */

gulp
  .task('default', ['dev']);

/*
 | dev = build:dev then server:dev & watch -> develompent mode;
 */

 gulp
  .task('dev', ['build:dev'], function ( done ){

    g.runSequence( ['server:dev', 'watch'], done);

  });

gulp
  .task('server:dev', function (){
    process.env.NODE_ENV = 'development';
    return g.nodemon('./server');

  });

gulp
  .task('watch', function (){

    gulp.watch(client.scripts, ['scripts:dev'], g.livereload.changed);
    gulp.watch(client.styles, g.livereload.changed);
    gulp.watch(client.templates, g.livereload.changed);

  })

/*
 | build: = build:dev, scripts:dev, inject,
 */

gulp
  .task('build:dev', ['scripts:dev'], function ( done ){
    g.runSequence('inject:dev',['bower:dev'], done);
  });

gulp
  .task('scripts:dev', function(){
    return gulp.src( client.scripts )
      .pipe( g.jshint() )
      .pipe( g.jshint.reporter('jshint-stylish'))
      .pipe( gulp.dest( tmp.app ) );
  });

gulp
  .task('inject:dev', function (){
    var core_options = { addRootSlash:false, name: 'core', relative: true }
    var modules_options = { addRootSlash:false, name: 'modules', relative: true }
    var styles_options = { addRootSlash:false, name: 'styles', relative: true }

    var core = gulp.src( client.core, {read:false} );
    var modules = gulp.src( client.modules, {read:false} );
    var styles = gulp.src( client.styles, {read:false} );

    return gulp.src( client.index )
      .pipe( g.inject( core, core_options ) )
      .pipe( g.inject( modules, modules_options ) )
      .pipe( g.inject( styles, styles_options ) )
      .pipe( gulp.dest( client.root ) )
  })

gulp
  .task('bower:dev', function () {

    var wire = wiredep.stream;

    return gulp.src( client.index )
      .pipe( wire({
        directory: client.bower,
        exclude: ['bootstrap-sass-official']
      }))
      .pipe( gulp.dest( client.root ) );
  });


/*
 | static = build:production, run static production server
 */

gulp
  .task('static', ['build:production'], function ( done ){
    g.runSequence('server:static', done);
  });

/*
 | server:static
 */

gulp
  .task('server:static', function(){
    process.env.NODE_ENV = 'production';
    require('./server');
  });

/*
 | build:production = scripts:prod, styles:prod, templates:prod, assets:prod, inject
 */

gulp
  .task('build:production', [
    'scripts:prod',
    'styles:prod',
    'templates:prod',
    'assets:prod'],
    function ( done ){
      g.runSequence('inject:prod', done);
    }
  );

gulp
  .task('scripts:prod', function (){
    return gulp.src( client.scripts )
      .pipe( g.jshint() )
      .pipe( g.jshint.reporter('jshint-stylish'))
      .pipe( g.concat( 'app.js' ) )
      .pipe( g.ngAnnotate( {add: true} ) )
      .pipe( g.uglify() )
      .pipe( gulp.dest( dist.app ) )
  });

gulp
  .task('styles:prod', function (){
    return gulp.src( client.scripts )
      // .pipe( g.autoprefixer( {browsers: AUTOPREFIXER_BROWSERS} ) )
      .pipe( g.concat( 'app.css' ) )
      // .pipe( g.if('*.css', g.csso() ) )
      .pipe( gulp.dest( dist.styles ) )
  });

gulp
  .task('templates:prod', function (){
    return gulp.src( client.templates )
      .pipe( g.angularTemplatecache( 'templates.js', { module: client.moduleName } ) )
      // .pipe( g.uglify() )
      .pipe( gulp.dest( dist.app ) );
  });

gulp
  .task('assets:prod', ['copy','images', 'bower:prod']);

gulp
  .task('copy', function () {
    return gulp.src([
      client.root + '/*.*',

      'node_modules/apache-server-configs/dist/.htaccess'],
      {
        dot: true
      }
    )
    .pipe( gulp.dest( dist.root ) )
  });

gulp
  .task('images', function () {
    return gulp.src( client.images )
      .pipe( g.cache( g.imagemin({
        progressive: true,
        interlaced: true
      })))
      .pipe( gulp.dest( dist.images ) );
  });

gulp
  .task('bower:prod', ['bowerfiles:prod'], function(){
    var wire = wiredep.stream;
    return gulp.src( dist.index )
      .pipe( wire({
        directory: dist.bower,
      }))
    .pipe( gulp.dest( dist.root ) );
  });

gulp
  .task('bowerfiles:prod', function (){
    return g.bower( client.bower )
      .pipe( gulp.dest( dist.bower ) );
  });

gulp
  .task('inject:prod', function (){
    var styles = gulp.src( dist.styles + '/**/*.css', {read:false} );
    var scripts = gulp.src( dist.scripts, {read:false} );

    var scripts_options = { addRootSlash:false, name: 'modules', relative: true };
    var styles_options = { addRootSlash:false, name: 'styles', relative: true };
    return gulp.src( dist.index )
      .pipe( g.inject( scripts, scripts_options ) )
      .pipe( g.inject( styles, styles_options ) )
      .pipe( gulp.dest( dist.root ) );
  });