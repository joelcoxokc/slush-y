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
    config = require('./config.js');

// load generators
gulp = require('./generators/app/index.js')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generators-crud')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/module/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/route/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/controller/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/view/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/service/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/factory/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/directive/')(gulp, _, inflection, g, mkdirp, config);
gulp = require('./generators/generator-angular/filter/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/config/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/generator-angular/test/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressModel')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressController')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressRoute')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressTest')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);