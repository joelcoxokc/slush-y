$stateProvider.
		state('<%= slugifiedName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'app/modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.client.view.html'
		}).