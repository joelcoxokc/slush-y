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

    Slushy.plugins(plugins, lodash)

    Slushy.siphon('default', {type: 'application'})

    Slushy.task('clear', del.dind(null, ['./db-demo/**/*']))

