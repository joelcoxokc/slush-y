/*
 * slush-meanjs
 * https://github.com/JoelCoxOKC/slush-y
 *
 * Copyright (c) 2014, Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

var gulp      = require('gulp'),
    install   = require('gulp-install'),
    conflict  = require('gulp-conflict'),
    template  = require('gulp-template'),
    rename    = require('gulp-rename'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    _str      = require('underscore.string'),
    plugins   = require('gulp-load-plugins')({lazy:false}),
    del       = require('del'),
    _         = require('lodash'),
    slushy    = require('./slushy.js');




    gulp.task( 'default', slushy.siphon() );

    /**
     * Client Generators
     */
    gulp.task( 'controller', slushy.siphon( 'client' ) );
    gulp.task( 'directive',  slushy.siphon( 'client' ) );
    gulp.task( 'factory',    slushy.siphon( 'client' ) );
    gulp.task( 'service',    slushy.siphon( 'client' ) );
    gulp.task( 'module',     slushy.siphon( 'client' ) );
    gulp.task( 'config',     slushy.siphon( 'client' ) );
    gulp.task( 'filter',     slushy.siphon( 'client' ) );
    gulp.task( 'route',      slushy.siphon( 'client' ) );
    gulp.task( 'view',       slushy.siphon( 'client' ) );
    // gulp.task( 'test',       slushy.siphon( 'client' ) );



    gulp.task('clear', del.bind(null, ['./client/**/*', './gulp', './server', '**', '!./client',  '!./node_modules', '!./client/bower_components']));

// gulp = require('./generators/app/index.js')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generators-crud')(gulp, _, inflection, inquirer, mkdirp, g, Slushy);
// gulp = require('./generators/generator-angular/module/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/route/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/controller/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/view/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/service/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/factory/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/directive/')(gulp, _, inflection, g, mkdirp);
// gulp = require('./generators/generator-angular/filter/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/confi/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/generator-angular/test/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/expressModel')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/expressController')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/expressRoute')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);
// gulp = require('./generators/expressTest')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g);








    // Slushy    = new Slushy

    // slushy = new Slushy({
    //   default: './generators/app/index.js',
    //   factory: './generators/generator-angular/factory/index.js',
    //   // config: 'generators/generator-angular/config/index.js',
    //   // module: 'generators/generator-angular/module/index.js',
    //   // directive: 'generators/generator-angular/directive/index.js'
    // })


    // gulp.task('default', function(){

    //   // $.util.log(this)
    //   console.log(this);
    // })
    // console.log('functions from slushfile.js', _.functions($.util))




// gulp = slushy.start({
//   default: 'generators/app/index.js',
//   config: 'generators/generator-angular/config/index.js',
//   module: 'generators/generator-angular/module/index.js',
//   directive: 'generators/generator-angular/module/index.js'

// });
