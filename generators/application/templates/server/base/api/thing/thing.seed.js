

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('./thing.model');

Thing.find({}).remove(function() {
  Thing.create({
    name: 'Environment',
    info: 'Awesome Environment set up using Gulp, Karma, Jasmin, inject, livereload, static server'
  },{
    name: 'Architecture',
    info: 'Beautiful and modular architecture helps avoid dependency injection, and makes it easy for new team members to jump right in.'
  },{
    name: 'Generators',
    info: 'Sub Generators to help you scaffold your app.'
  },{
    name: 'Material Styles',
    info: 'Awesome bower package "material-styles"! comes with all color styles from the Google Material Design palette'
  },{
    name: 'Authentication',
    info: 'Full authentication system with user roles and user management.'
  },{
    name: 'Examples modules',
    info: 'Comes with an \'THIS\' Features module, and the generators module.'
  },{
    name: 'Server',
    info: 'Fully packed NodeJS and ExpressJS server, using MongoDB as the database.'
  });
});

