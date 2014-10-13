'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

module.exports = function(app){


  var router = express.Router();

  router.get('/', auth.hasRole('admin'), controller.index);
  router.delete('/:id', auth.hasRole('admin'), controller.destroy);
  router.get('/me', auth.isAuthenticated(), controller.me);
  router.put('/:id', auth.isAuthenticated(), controller.update);
  router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
  router.get('/:id', auth.isAuthenticated(), controller.show);
  router.post('/', controller.create);

  app.use('/api/users', router);

// module.exports = router;
}