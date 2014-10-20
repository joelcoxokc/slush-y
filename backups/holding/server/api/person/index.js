'use strict';

var express = require('express');
var controller = require('./person.controller.js');

module.exports = function(app){

  // Instantiate a new express router
  // bind the router to the app at the end.
  var router = express.Router();


  // GET: /api/people
  router.get('/', controller.index);
  // GET: /api/people/:id
  router.get('/:id', controller.show);
  // POST: /api/people
  router.post('/', controller.create);
  // PUT: /api/people/:id
  router.put('/:id', controller.update);
  // DELETE: /api/people/:id
  router.delete('/:id', controller.destroy);
  router.param('id', controller.personByID);
  app.use('/api/people', router);

}