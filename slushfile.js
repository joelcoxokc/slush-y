/*
 * slush-slush-db
 * https://github.com/joelcoxokc/slush-slush-db
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


    gulp.task('controller', require('./generators/client/controller'));

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

    Slushy.task('clear', del.bind(null, ['./db-demo/**/*']))

