'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * <%= classifiedModelName %> Schema
 */
var <%= classifiedModelName %>Schema = new Schema({
	// <%= classifiedModelName %> model fields
	// ...
});

module.exports = mongoose.model('<%= classifiedModelName %>', <%= classifiedModelName %>Schema);