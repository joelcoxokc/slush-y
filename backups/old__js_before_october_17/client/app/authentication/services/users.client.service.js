;(function(){
'use strict';

  // Authentication service for user variables
  angular
    .module('authentication')
    .factory('Users', Users);

  /* @inject */
  function Users($resource) {
  // Users service used for communicating with the users REST endpoint
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}

}).call(this);

