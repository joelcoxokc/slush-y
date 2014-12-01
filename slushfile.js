/*
 * slush-y
 * https://github.com/joelcoxokc/slush-y
 *
 * Copyright (c) 2014, Joel Cox
 * Licensed under the MIT license.
 */

'use strict';

var gulp    = require('gulp'),
    del     = require('del'),
    Config  = require('gulp-config')(gulp),
    Storage = require('gulp-storage')(gulp),
    Finder  = require('gulp-finder')(gulp),
    Slushy  = require('./src')(gulp);
    var plugins  = require('gulp-load-plugins')({lazy:false})
    var lodash   = require('lodash');
    var Generator = require('./lib');
    var gulpCommand = require('gulp-command')(gulp)


    Generator
      .start('default', {root:'./generators/application'})

    Generator
      .start('config', {root:'./generators/client/config'})
      .required('name')
      .option('module', '-m, --module', 'String')
      .option('providers', '-p, --providers', 'Array');

    Generator
      .start('controller', {root:'./generators/client/controller'})
      .required('name')
      .option('module', '-m', '--module', 'String')
      .option('providers', '-p', '--providers', 'Array')
      .option('functions', '-f', '--functions', 'Array');

    Generator
      .start('directive', {root: './generators/client/directive'})
      .required('name')
      .option('module', '-m', '--module', 'String')
      .option('providers', '-p', '--providers', 'Array')
      .option('functions', '-f', '--functions', 'Array')
      .option('simple', '-s', '--simple', 'Bool')
      .option('complex', '-c', '--complex', 'Bool');
    // gulp.task('directive', require('./generators/client/directive'));

    Generator
      .start('factory', {root:'./generators/client/factory'})
      .required('name')
      .option('module', '-m', '--module', 'String')
      .option('providers', '-p', '--providers', 'Array')
      .option('functions', '-f', '--functions', 'Array');
    // gulp.task('factory', require('./generators/client/factory'));

    Generator
      .start('service', {root:'./generators/client/service'})
      .required('name')
      .option('module', '-m', '--module', 'String')
      .option('providers', '-p', '--providers', 'Array')
      .option('functions', '-f', '--functions', 'Array');
    // gulp.task('service', require('./generators/client/service'));

    Generator
      .start('filter', {root:'./generators/client/filter'})
      .required('name')
      .option('module', '-m', '--module', 'String')
      .option('providers', '-p', '--providers', 'Array')
      .option('functions', '-f', '--functions', 'Array');
    // gulp.task('filter', require('./generators/client/filter'));

    Generator
      .start('module', {root:'./generators/client/module'})
      .required('name')
      .option('folders', '-f', '--folders', 'Array');
    // gulp.task('module', require('./generators/client/module'));

    gulp.task('route', require('./generators/client/route'));
    gulp.task('view', require('./generators/client/view'));
    gulp.task('crud', require('./generators/crud'));
    gulp.task('api', require('./generators/server_api'));

    // Slushy.plugins(plugins, lodash)

    // Slushy.siphon('default', {type: 'application'})
    // Slushy.siphon('module', {type: 'client'})
    // Slushy.siphon('config', {type: 'client'})
    // Slushy.siphon('controller', {type: 'client'})
    // Slushy.siphon('directive', {type: 'client'})
    // Slushy.siphon('factory', {type: 'client'})
    // Slushy.siphon('filter', {type: 'client'})
    // // Slushy.siphon('route', {type: 'client'})
    // Slushy.siphon('service', {type: 'client'})
    // Slushy.siphon('view', {type: 'client'})

    // Slushy.task('clear', del.bind(null, ['./db-demo/**/*']))

