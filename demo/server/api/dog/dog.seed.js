(function(){

  'use strict';
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
  var Dog = require('./dog.model');

  Dog.find({}).remove(function() {

    Dog.create(
      {
        name: '',
         age: '',
         phone: '',
      },
      {
        name: '',
         age: '',
         phone: '',
      },
      {
        name: '',
         age: '',
         phone: '',
      },
      {
        name: '',
         age: '',
         phone: '',
      },
      {
        name: '',
         age: '',
         phone: '',
      },
      {
        name: '',
         age: '',
         phone: '',
      });

  });

})();