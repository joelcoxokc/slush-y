/*
 * slush-meanjs
 * https://github.com/JoelCoxOKC/slush-y
 *
 * Copyright (c) 2014, Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

    var gulp      = require('gulp');
    var slushy    = require('./slushy');
    var helper = require('gulp-help');
    var config = require('gulp-config')(gulp)
    var _ = require('lodash')
    var gulp = require('./default.js')(gulp)

    // gulp.storage.set('me', 'joel')


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
    gulp.task( 'crud',              slushy.siphon( ) );
    gulp.task( 'server-model',      slushy.siphon( 'server' ) );
    gulp.task( 'server-controller', slushy.siphon( 'server' ) );
    gulp.task( 'server-route',      slushy.siphon( 'server' ) );
    gulp.task( 'server-test',       slushy.siphon( 'server' ) );

