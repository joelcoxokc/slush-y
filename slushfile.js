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
    Slushy    = require('./slushy/Slushy.js'),
    _         = require('lodash')
    // runner    = require('runner.js');


    var slushy = new Slushy;

    slushy.register().Plugins(gulp, inquirer, plugins, _, path, _str);


    slushy.register(__dirname).Generators({
      default: './test-generators/app/',
      // config:     './generators/generator-angular/config/',
      // module:     './generators/generator-angular/module/',
      // controller: './generators/generator-angular/controller/',
      // directive:  './generators/generator-angular/directive/',
      // factory:    './generators/generator-angular/factory/',
      // filter:     './generators/generator-angular/filter/',
      // service:    './generators/generator-angular/service/',
    })

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
