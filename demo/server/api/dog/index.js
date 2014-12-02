(function(){
  'use strict';

  var express = require('express');
  var controller = require('./dog.controller.js');

  module.exports = function(app){

    // Instantiate a new express router
    // bind the router to the app at the end.
    var router = express.Router();


    // GET: /api/dogs
    router.get('/', controller.index);
    // GET: /api/dogs/:id
    router.get('/:id', controller.show);
    // POST: /api/dogs
    router.post('/', controller.create);
    // PUT: /api/dogs/:id
    router.put('/:id', controller.update);
    // DELETE: /api/dogs/:id
    router.delete('/:id', controller.destroy);
    router.param('id', controller.dogByID);
    app.use('/api/dogs', router);

  }

})();