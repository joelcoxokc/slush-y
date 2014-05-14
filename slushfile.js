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
    mkdirp = require('mkdirp');

// load generators
gulp = require('./generators/app')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/crudModule')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularModule')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularRoute')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularController')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularView')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularService')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularDirective')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularFilter')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularConfig')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/angularTest')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/expressModel')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/expressController')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/expressRoute')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);
gulp = require('./generators/expressTest')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp);