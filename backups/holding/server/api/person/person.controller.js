/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /people              ->  index
 * POST    /people              ->  create
 * GET     /people/:id          ->  show
 * PUT     /people/:id          ->  update
 * DELETE  /people/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Person = require('./person.model');

// Get list of people
exports.index = function(req, res) {
  Person.find(function (err, people) {
    if(err) { return handleError(res, err); }
    return res.json(200, people);
  });
};

// Get a single person
exports.show = function(req, res) {
  Person.findById(req.params.id, function (err, person) {
    if(err) { return handleError(res, err); }
    if(!person) { return res.send(404); }
    return res.json(person);
  });
};

// Creates a new person in the DB.
exports.create = function(req, res) {
  Person.create(req.body, function(err, person) {
    if(err) { return handleError(res, err); }
    return res.json(201, person);
  });
};

// Updates an existing person in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Person.findById(req.params.id, function (err, person) {
    if (err) { return handleError(res, err); }
    if(!person) { return res.send(404); }
    var updated = _.merge(person, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, person);
    });
  });
};

// Deletes a person from the DB.
exports.destroy = function(req, res) {
  Person.findById(req.params.id, function (err, person) {
    if(err) { return handleError(res, err); }
    if(!person) { return res.send(404); }
    person.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Person middleware
 */
exports.personByID = function(req, res, next, id) {
  Person.findById(id).populate('user', 'displayName').exec(function(err, person) {
    if (err) return next(err);
    if (!person) return next(new Error('Failed to load Person ' + id));
    req.person = person;
    next();
  });
};

/**
 * Person authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.person.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};
function handleError(res, err) {
  return res.send(500, err);
}