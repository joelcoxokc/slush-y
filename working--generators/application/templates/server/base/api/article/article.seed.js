(function(){

  'use strict';
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
  var User  = require('../user/user.model');
  var Article = require('./article.model');

  Article.find({}).remove(function() {
    User.find({username:'Admin'}, function (error, user){
      Article.create({
        title: 'Environment',
        content: 'Awesome Environment set up using Gulp, Karma, Jasmin, inject, livereload, static server',
        user: user._id
      },{
        title: 'Architecture',
        content: 'Beautiful and modular architecture helps avoid dependency injection, and makes it easy for new team members to jump right in.',
        user: user._id
      },{
        title: 'Generators',
        content: 'Sub Generators to help you scaffold your app.',
        user: user._id
      },{
        title: 'Material Styles',
        content: 'Awesome bower package "material-styles"! comes with all color styles from the Google Material Design palette',
        user: user._id
      },{
        title: 'Authentication',
        content: 'Full authentication system with user roles and user management.',
        user: user._id
      },{
        title: 'Examples modules',
        content: 'Comes with an \'THIS\' Features module, and the generators module.',
        user: user._id
      },{
        title: 'Server',
        content: 'Fully packed NodeJS and ExpressJS server, using MongoDB as the database.',
        user: user._id
      });
    });
  });

})();