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
    // var ee      = require('event-emitter'),
    //   emitter = ee({}), listener


    Generator
      .start('default', {root:'./generators/application'})
      .option('name', '-n', '--name', 'String')
    Generator
      .start('config', {root:'./generators/client/config'})
      .option('name', '-n', '--name', 'String');
    // gulp.task('default', require('./generators/application'));
    gulp.task('controller', require('./generators/client/controller'));
    // gulp.task('config', require('./generators/client/config'));
    gulp.task('directive', require('./generators/client/directive'));
    gulp.task('factory', require('./generators/client/factory'));
    gulp.task('service', require('./generators/client/service'));
    gulp.task('filter', require('./generators/client/filter'));
    gulp.task('route', require('./generators/client/route'));
    gulp.task('view', require('./generators/client/view'));
    gulp.task('module', require('./generators/client/module'));
    gulp.task('crud', require('./generators/crud'));
    gulp.task('api', require('./generators/server_api'));

    Slushy.plugins(plugins, lodash)

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

