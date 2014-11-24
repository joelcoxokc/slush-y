(function(){

  'use strict';
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
  var User  = require('../user/user.model');
  var Contact = require('./contact.model');

  Contact.find({}).remove(function() {
    User.find({username:'Admin'}, function (error, user){
      Contact.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.doe@john.com',
        phone: '999-222-4443'
      },{
        firstName: 'Becky',
        lastName: 'Williams',
        email: 'becky.williams@becky.com',
        phone: '999-222-4443'
      },{
        firstName: 'Fred',
        lastName: 'Jones',
        email: 'fred.jones@jones.com',
        phone: '999-222-4443'
      },{
        firstName: 'Bill',
        lastName: 'Jackson',
        email: 'Bill.Jackson@bill.com',
        phone: '999-222-4443'
      },{
        firstName: 'Jimmy',
        lastName: 'Nipps',
        email: 'Jimmy.Nipps@Nipps.com',
        phone: '999-222-4443'
      },{
        firstName: 'Bao',
        lastName: 'Wong',
        email: 'Bao.Wong@wong.com',
        phone: '999-222-4443'
      },{
        firstName: 'Joel',
        lastName: 'Cox',
        email: 'Joel.Cox@joel.com',
        phone: '999-222-4443'
      });
    });
  });

})();