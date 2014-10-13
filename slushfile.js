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
gulp = require('./generators/app')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/crudModule')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/module/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/route/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/controller/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/view/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/service/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/factory/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/directive/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/filter/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/config/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/angular/test/')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressModel')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressController')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressRoute')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);
gulp = require('./generators/expressTest')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g, config);