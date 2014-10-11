'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Person = mongoose.model('Person'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Person already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Person
 */
exports.create = function(req, res) {
	var person = new Person(req.body);
	person.user = req.user;

	person.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * Show the current Person
 */
exports.read = function(req, res) {
	res.jsonp(req.person);
};

/**
 * Update a Person
 */
exports.update = function(req, res) {
	var person = req.person;

	person = _.extend(person, req.body);

	person.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * Delete an Person
 */
exports.delete = function(req, res) {
	var person = req.person;

	person.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * List of People
 */
exports.list = function(req, res) {
	Person.find().sort('-created').populate('user', 'displayName').exec(function(err, people) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(people);
		}
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