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
// GULP PATHS
var errorHandler= require('./build/errors');
var config      = require('./build/config');
var client      = config.client;
var tmp         = config.build;
var dist        = config.dist;
var runServers  = require('./servers.runner.js')
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

/*
 | Default
 */
gulp.task('default', ['clean'], function (cb) {

  g.runSequence('copy', 'images', ['build'],'inject', cb);
});

/*
 |  SERVER
 */
gulp.task('server', ['serve']);
gulp.task('serve',['clean'], function (done) {
  g.runSequence(['build', 'run:servers'], 'browserSync', done);
});

/*
 | CLEAN and remove the .tmp directory
 */
gulp.task('clean',['remove:inject'], del.bind(null, ['./.tmp', './dist']));


/*
 | Browser Sync Server for Dev Environment
 */
gulp.task('browserSync', function(){
  browserSync({
    notify: false,
    // https: true,
    server: ['.tmp', 'client'],
    socket: {
      path: '/socket.io-client',
      clientPath: '/socket.io-client',
      namespace: '/socket.io-client'
    }
  });
  gulp.watch(client.templates.jade, reload);
  
  gulp.watch(client.styles.css, ['styles', reload]);
  
  gulp.watch(client.templates.jade, ['compile:templates'], reload);
  gulp.watch(client.scripts.all, ['scripts']);
  gulp.watch(client.images, reload);
});

/*
 | Run all servers in the servers folder
 */
gulp.task('run:servers', function(){

  runServers.base();
});

/*
 | Browser Sync Server For Production Environment
 */
gulp.task('dist', ['default','run:servers'], function () {
  browserSync({
    notify: false,
    // https: true,
    server: './dist',
    socket: {
      path: '/socket.io-client',
      clientPath: '/socket.io-client',
      namespace: '/socket.io-client'
    }
  });
});

/*
 | Gulp Karma Test
 */
gulp.task('test', ['karma:inject:bower', 'serve'], function ( done ){

  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

/*
 |  JSHINT on client side scripts, but leaving them in there place;
 */
gulp.task('scripts', function(){
  return gulp.src(client.scripts.all)
    .pipe( reload({stream: true, once: true}) )
    .pipe( g.jshint() )
    .pipe( g.jshint.reporter('jshint-stylish'))
    .pipe( gulp.dest( tmp.path ) )
    .pipe( g.concat(config.app_file_name) )
    .pipe( g.ngAnnotate({
      // true helps add where @ngInject is not used. It infers.
      // Doesn't work with resolve, so we must be explicit there
      add: true
    }))
    .pipe( g.uglify() )
    .pipe( gulp.dest( dist.scriptPath ) )
    .pipe( g.if(!browserSync.active, g.jshint.reporter('fail')));
});

/*
 | Compile all styles
 */
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  
  return gulp.src( client.styles.css )
    .pipe( g.changed('styles', {extension: '.css'} ) )
    .on( 'error', console.error.bind( console ) )
    .pipe( g.autoprefixer( {browsers: AUTOPREFIXER_BROWSERS} ) )
    .pipe( g.concat( config.css_file_name ) )
    .pipe( gulp.dest( tmp.stylePath ) )
    .pipe( g.if('*.css', g.csso() ) )
    .pipe( gulp.dest( dist.stylePath ) )
});

/*
 | COMPILE JADE and place them into the .tmp directory
 */
gulp.task('compile:jade', function(){
  return gulp.src( client.templates.jade )
    .pipe( g.jade() )
    .pipe( g.angularTemplatecache( config.jade_file_name, { module: config.module_name }))
    .pipe( gulp.dest( tmp.templatePath ))
    .pipe( g.uglify() )
    .pipe( gulp.dest( dist.templatePath ) );
});

/*
 | COMPILE JADE and place them into the .tmp directory
 */
gulp.task('compile:html', function(){
  return gulp.src( client.templates.html )
    .pipe( g.angularTemplatecache( config.html_file_name, { module: config.module_name } ) )
    .pipe( gulp.dest( tmp.templatePath ) )
    .pipe( g.uglify() )
    .pipe( gulp.dest( dist.templatePath ) );
});

/*
 | COMPILE Both jade and html templates into the .tmp/templates
 */
gulp.task('compile:templates', function (done){
  g.runSequence([
    'compile:jade',
    'compile:html'
  ], done)
});

/*
 | Run Scripts before injecting into client;
 */
gulp.task('build',['styles', 'scripts','compile:templates', 'inject:bower'], function(){

  return buildServerInjector();
});


/*
 |  INJECT BOWER DEPENDENCIES with wiredep into client/index.html
 */
gulp.task('inject:bower', function () {

  var wiredep = require('wiredep').stream;
  return gulp.src(client.index)
    .pipe(wiredep({
      directory: client.bower,
      exclude: ['bootstrap-sass-official']
    }))
    .pipe( gulp.dest( client.path ) );
});

gulp.task('remove:inject', function(){
  var head = gulp.src( './build/injector/head.html' );
  var body = gulp.src( './build/injector/body.html' );
  return gulp.src( client.index )
    .pipe( g.inject(head,{
      starttag: '<!-- HEAD -->',
      endtag: '<!-- END:HEAD -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe( g.inject(body,{
      starttag: '<!-- BODY -->',
      endtag: '<!-- END:BODY -->',
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe( gulp.dest( client.path ) );
});

/* DIST
 | MINIFY IMAGES for dist
 */
gulp.task('images', function () {
  return gulp.src(client.images)
    .pipe( g.cache( g.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe( gulp.dest( dist.images ) )
    .pipe( g.size( {title: 'images'} ));
});

/* DIST
 | Copy All files for dist
 */
gulp.task('copy', function () {
  return gulp.src([
    client.path + '*.*',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe( gulp.dest( dist.path ) )
    .pipe( g.size( {title: 'copy'} ) );
});

/*  DIST
 |  BUILD BOWER copy all bower files to the dist/bower_components directory
 |            - inject all bower scripts and styles into index.html
 */
gulp.task('build:bower',[
  'dist:bower:files'],
  function ( callback ){
    g.runSequence('dist:inject:bower', callback);
  }
);

/*
 |  DIST BOWER FILES copy all bower files to the dist/bower_components directory
 */
gulp.task('dist:bower:files', function(){

  return g.bower( client.bower )
    .pipe( gulp.dest( dist.bower ) )
});

/*
 |  DIST INJECT BOWER inject all bower scripts and styles into index.html
 */
gulp.task('dist:inject:bower',['dist:bower:files'], function(){
  var wiredep = require('wiredep').stream;
  return gulp.src( dist.index )
    .pipe(wiredep({
      directory: dist.bower,
      exclude: ['bootstrap-sass-official']
    }))
  .pipe( gulp.dest( dist.path ) );
});

gulp.task('inject',['dist:inject:bower'], function (){

  return buildDistInjector();
});


gulp.task('karma:inject:bower', function(){

  var bower = mainBowerFiles({
    paths: {
      bowerrc: './.bowerrc',
      bowerJson: './bower.json',
      includeDev: true
    }
  })
  return gulp.src('./karma.conf.js')
  .pipe( g.inject( gulp.src(bower), {
    starttag: 'bower= [',
    endtag: ']',
    addRootSlash: false,
    transform: function (filepath, file, i, length) {
      return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
    }
  }))
  .pipe( g.inject( gulp.src(client.specs), {
      starttag: 'client= [',
      endtag: ']',
      addRootSlash: false,
      transform: function (filepath, file, i, length) {
        return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
      }
    }
  ))
  .pipe( gulp.dest('./') );
});

/*
 | INJECT all scritps into index.html;
 */
function injector(options){
  return options.target
    .pipe( g.inject(options.styles.src, options.styles.params) )
    .pipe( g.inject(options.vendor.src, options.vendor.params) )
    // .pipe( g.inject(options.root.src, options.root.params) )
    .pipe( g.inject(options.bundle.src, options.bundle.params) )
    .pipe( g.inject(options.templates.src, options.templates.params) )
    .pipe( gulp.dest( options.dest ) );
}


/*
 | BUILD INJECTOR PARAMS for gulp server then call injector()
 */
function buildServerInjector(){
  var options = {
      target: gulp.src( client.index ),
      dest: client.path,
      styles: {
        src: gulp.src( tmp.styles, {read:false}),
        params: {addRootSlash:true, ignorePath: '.tmp', name:'styles'}
      },
      vendor: {
        src: gulp.src( client.vendor, {read:false}),
        params: {addRootSlash:false, relative:true, name:'vendor'}
      },
      bundle:{
        src: gulp.src( tmp.scripts, {read:false}),
        params: {addRootSlash:true, ignorePath: '.tmp', name:'bundle'}
      },
      templates: {
        src: gulp.src( tmp.templates, {read:false}),
        params: {addRootSlash:true, ignorePath:'.tmp', name:'templates'}
      }
    }
    return injector(options);
}


function injectorDist(options){
  return options.target
    .pipe( g.inject(options.styles.src, options.styles.params) )
    .pipe( g.inject(options.vendor.src, options.vendor.params) )
    .pipe( g.inject(options.root.src, options.root.params) )
    .pipe( g.inject(options.bundle.src, options.bundle.params) )
    .pipe( g.inject(options.templates.src, options.templates.params) )
    .pipe( gulp.dest( dist.path ) );
}
/*
 | BUILD INJECTOR PARAMS for gulp server then call injector()
 */
function buildDistInjector(){
  var options = {
      target: gulp.src( dist.index ),
      dest: dist.path,
      styles: {
        src: gulp.src( dist.styles, {read:false}),
        params: {addRootSlash:false, relative:true, name:'styles'}
      },
      vendor: {
        src: gulp.src( dist.scriptPath + config.vendor_file_name, {read:false}),
        params: {addRootSlash:false, relative:true, name:'vendor'}
      },
      root: {
        src: gulp.src( dist.scriptPath + config.app_file_name, {read:false}),
        params: {addRootSlash:false, relative:true, name:'root'}
      },
      bundle:{
        src: gulp.src( dist.scriptPath + config.modules_file_name, {read:false}),
        params: {addRootSlash:false, relative:true, name:'bundle'}
      },
      templates: {
        src: gulp.src( dist.templates, {read:false}),
        params: {addRootSlash:false, relative:true, name:'templates'}
      }
    }
    return injectorDist(options);
}



/*
 | CLEAN and remove the dist directory
 */
gulp.task('build:scripts', ['scripts:root', 'scripts:bundle', 'scripts:vendor']);

gulp.task('scripts:root', function(){
  return gulp.src(client.scripts.root)
    .pipe( g.jshint())
      .on('error', errorHandler.onWarning )
    .pipe( g.jshint.reporter('default') )
    .pipe( g.ngAnnotate() )
    .pipe( g.rename(config.app_file_name ) )
    .pipe( gulp.dest( dist.scriptPath ) );
});
gulp.task('scripts:bundle', function(){
  return gulp.src( client.scripts.modules )
    .pipe( g.jshint() )
      .on('error', errorHandler.onWarning )
    .pipe( g.jshint.reporter('default') )
    .pipe( g.ngAnnotate() )
    .pipe( g.concat( config.modules_file_name ) )
    .pipe( g.uglify() )
    .pipe( gulp.dest( dist.scriptPath ) )
});
gulp.task('scripts:vendor', function(){
  return gulp.src( client.vendor )
    .pipe( g.concat( config.vendor_file_name ) )
    .pipe( g.uglify() )
    .pipe( gulp.dest( dist.scriptPath ) );
});