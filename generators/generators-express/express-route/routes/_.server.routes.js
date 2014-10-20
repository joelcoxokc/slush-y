'use strict';

var express = require('express');

/*
 * Require Some Controller
 */
// var controller = require()

module.exports = function(app) {

  var router = express.Router()

/*
 * Routing logic
 */

  // router.get('/', controller.index )
  // router.post('/', controller.create )
  // router.get('/:param', controller.show )
  // router.put('/:param', controller.update )
  // router.delete('/:param', controller.delete )

  app.use('/api/<%= slugifiedName %>', router)
};