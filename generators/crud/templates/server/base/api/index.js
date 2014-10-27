(function(){
  'use strict';

  var express = require('express');
  var controller = require('./<%= names.single.slug %>.controller.js');

  module.exports = function(app){

    // Instantiate a new express router
    // bind the router to the app at the end.
    var router = express.Router();


    // GET: /api/<%= names.plural.camel %>
    router.get('/', controller.index);
    // GET: /api/<%= names.plural.camel %>/:id
    router.get('/:id', controller.show);
    // POST: /api/<%= names.plural.camel %>
    router.post('/', controller.create);
    // PUT: /api/<%= names.plural.camel %>/:id
    router.put('/:id', controller.update);
    // DELETE: /api/<%= names.plural.camel %>/:id
    router.delete('/:id', controller.destroy);
    router.param('id', controller.<%= names.single.camel %>ByID);
    app.use('/api/<%= names.plural.camel %>', router);

  }

})();