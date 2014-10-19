/*
 * slush-meanjs
 * https://github.com/arvindr21/slush-meanjs
 *
 * Copyright (c) 2014, Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inflection = require('inflection'),
    inquirer = require('inquirer'),
    mkdirp = require('mkdirp'),
    g    = require('gulp-load-plugins')({lazy:false}),
    Slushy = require('./Slushy.js')


gulp = Slushy.start({
  default: 'generators/app/index.js',

});


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