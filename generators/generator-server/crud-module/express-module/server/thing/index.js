'use strict';

var express = require('express');
var controller = require('./<%= camelizedSingularName %>.controller.js');

module.exports = function(app){

  // Instantiate a new express router
  // bind the router to the app at the end.
  var router = express.Router();


  // GET: /api/<%= camelizedPluralName %>
  router.get('/', controller.index);
  // GET: /api/<%= camelizedPluralName %>/:id
  router.get('/:id', controller.show);
  // POST: /api/<%= camelizedPluralName %>
  router.post('/', controller.create);
  // PUT: /api/<%= camelizedPluralName %>/:id
  router.put('/:id', controller.update);
  // DELETE: /api/<%= camelizedPluralName %>/:id
  router.delete('/:id', controller.destroy);
  router.param('id', controller.<%= camelizedSingularName %>ByID);
  app.use('/api/<%= camelizedPluralName %>', router);

}