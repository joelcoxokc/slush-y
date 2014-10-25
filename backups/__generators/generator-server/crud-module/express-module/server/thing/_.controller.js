/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /<%= camelizedPluralName %>              ->  index
 * POST    /<%= camelizedPluralName %>              ->  create
 * GET     /<%= camelizedPluralName %>/:id          ->  show
 * PUT     /<%= camelizedPluralName %>/:id          ->  update
 * DELETE  /<%= camelizedPluralName %>/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var <%= classifiedSingularName %> = require('./<%= camelizedSingularName %>.model');

// Get list of <%= camelizedPluralName %>
exports.index = function(req, res) {
  <%= classifiedSingularName %>.find(function (err, <%= camelizedPluralName %>) {
    if(err) { return handleError(res, err); }
    return res.json(200, <%= camelizedPluralName %>);
  });
};

// Get a single <%= camelizedSingularName %>
exports.show = function(req, res) {
  <%= classifiedSingularName %>.findById(req.params.id, function (err, <%= camelizedSingularName %>) {
    if(err) { return handleError(res, err); }
    if(!<%= camelizedSingularName %>) { return res.send(404); }
    return res.json(<%= camelizedSingularName %>);
  });
};

// Creates a new <%= camelizedSingularName %> in the DB.
exports.create = function(req, res) {
  <%= classifiedSingularName %>.create(req.body, function(err, <%= camelizedSingularName %>) {
    if(err) { return handleError(res, err); }
    return res.json(201, <%= camelizedSingularName %>);
  });
};

// Updates an existing <%= camelizedSingularName %> in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  <%= classifiedSingularName %>.findById(req.params.id, function (err, <%= camelizedSingularName %>) {
    if (err) { return handleError(res, err); }
    if(!<%= camelizedSingularName %>) { return res.send(404); }
    var updated = _.merge(<%= camelizedSingularName %>, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, <%= camelizedSingularName %>);
    });
  });
};

// Deletes a <%= camelizedSingularName %> from the DB.
exports.destroy = function(req, res) {
  <%= classifiedSingularName %>.findById(req.params.id, function (err, <%= camelizedSingularName %>) {
    if(err) { return handleError(res, err); }
    if(!<%= camelizedSingularName %>) { return res.send(404); }
    <%= camelizedSingularName %>.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function(req, res, next, id) {
  <%= classifiedSingularName %>.findById(id).populate('user', 'displayName').exec(function(err, <%= camelizedSingularName %>) {
    if (err) return next(err);
    if (!<%= camelizedSingularName %>) return next(new Error('Failed to load <%= humanizedSingularName %> ' + id));
    req.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    next();
  });
};

/**
 * <%= humanizedSingularName %> authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.<%= camelizedSingularName %>.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};
function handleError(res, err) {
  return res.send(500, err);
}