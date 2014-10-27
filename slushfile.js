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
    slushy    = require('./slushy');


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


    /**
     * Server Generators
     */
    gulp.task( 'crud',       slushy.siphon( ) );