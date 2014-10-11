'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var people = require('../../app/controllers/people');

	// People Routes
	app.route('/people')
		.get(people.list)
		.post(users.requiresLogin, people.create);
	
	app.route('/people/:personId')
		.get(people.read)
		.put(users.requiresLogin, people.hasAuthorization, people.update)
	    .delete(users.requiresLogin, people.hasAuthorization, people.delete);

	// Finish by binding the Person middleware
	app.param('personId', people.personByID);
};