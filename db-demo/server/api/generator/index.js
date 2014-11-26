'use strict';

var express = require('express');
var controller = require('./generator.controller.js');

module.exports = function(app){

  // Instantiate a new express router
  // bind the router to the app at the end.
  var router = express.Router();


  // GET: /api/generators
  router.get('/', controller.index);
  // GET: /api/generators/:id
  router.get('/:id', controller.show);
  // POST: /api/generators
  router.post('/', controller.create);
  // PUT: /api/generators/:id
  router.put('/:id', controller.update);
  // DELETE: /api/generators/:id
  router.delete('/:id', controller.destroy);
  router.param('id', controller.generatorByID);
  app.use('/api/generators', router);

}