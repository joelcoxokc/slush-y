'use strict';

var express = require('express');
var controller = require('./article.controller.js');

module.exports = function(app){

  // Instantiate a new express router
  // bind the router to the app at the end.
  var router = express.Router();


  // GET: /api/articles
  router.get('/', controller.index);
  // GET: /api/articles/:id
  router.get('/:id', controller.show);
  // POST: /api/articles
  router.post('/', controller.create);
  // PUT: /api/articles/:id
  router.put('/:id', controller.update);
  // DELETE: /api/articles/:id
  router.delete('/:id', controller.destroy);
  router.param('id', controller.articleByID);
  app.use('/api/articles', router);

}