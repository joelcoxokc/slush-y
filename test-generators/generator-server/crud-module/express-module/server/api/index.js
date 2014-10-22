'use strict';
var express = require('express');
module.exports = function(app) {
  var users = require('../user/user.controller');
  var <%= camelizedPluralName %> = require('./<%= camelizedSingularName %>.controller.js');

  var router = express.Router();

  // <%= humanizedPluralName %> Routes
  app.route('/<%= slugifiedPluralName %>')
    .get(<%= camelizedPluralName %>.list)
    .post(users.requiresLogin, <%= camelizedPluralName %>.create);

  app.route('/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id')
    .get(<%= camelizedPluralName %>.read)
    .put(users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.update)
      .delete(users.requiresLogin, <%= camelizedPluralName %>.hasAuthorization, <%= camelizedPluralName %>.delete);

  // Finish by binding the <%= humanizedSingularName %> middleware
  app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);


  app.use('/api/<%= slugifiedPluralName %>', router)
};