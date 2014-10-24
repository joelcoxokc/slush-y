/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /generators              ->  index
 * POST    /generators              ->  create
 * GET     /generators/:id          ->  show
 * PUT     /generators/:id          ->  update
 * DELETE  /generators/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Generator = require('./generator.model');

// Get list of generators
exports.index = function(req, res) {
  Generator.find(function (err, generators) {
    if(err) { return handleError(res, err); }
    return res.json(200, generators);
  });
};

// Get a single generator
exports.show = function(req, res) {
  Generator.findById(req.params.id, function (err, generator) {
    if(err) { return handleError(res, err); }
    if(!generator) { return res.send(404); }
    return res.json(generator);
  });
};

// Creates a new generator in the DB.
exports.create = function(req, res) {
  Generator.create(req.body, function(err, generator) {
    if(err) { return handleError(res, err); }
    return res.json(201, generator);
  });
};

// Updates an existing generator in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Generator.findById(req.params.id, function (err, generator) {
    if (err) { return handleError(res, err); }
    if(!generator) { return res.send(404); }
    var updated = _.merge(generator, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, generator);
    });
  });
};

// Deletes a generator from the DB.
exports.destroy = function(req, res) {
  Generator.findById(req.params.id, function (err, generator) {
    if(err) { return handleError(res, err); }
    if(!generator) { return res.send(404); }
    generator.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Generator middleware
 */
exports.generatorByID = function(req, res, next, id) {
  Generator.findById(id).populate('user', 'displayName').exec(function(err, generator) {
    if (err) return next(err);
    if (!generator) return next(new Error('Failed to load Generator ' + id));
    req.generator = generator;
    next();
  });
};

/**
 * Generator authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.generator.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};
function handleError(res, err) {
  return res.send(500, err);
}