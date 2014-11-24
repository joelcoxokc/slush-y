(function(){
  'use strict';

  var express = require('express');
  var controller = require('./contact.controller.js');

  module.exports = function(app){

    // Instantiate a new express router
    // bind the router to the app at the end.
    var router = express.Router();


    // GET: /api/contacts
    router.get('/', controller.index);
    // GET: /api/contacts/:id
    router.get('/:id', controller.show);
    // POST: /api/contacts
    router.post('/', controller.create);
    // PUT: /api/contacts/:id
    router.put('/:id', controller.update);
    // DELETE: /api/contacts/:id
    router.delete('/:id', controller.destroy);
    router.param('id', controller.contactByID);
    app.use('/api/contacts', router);

  }

})();