'use strict';

(function() {
	// <%= names.plural.humanized %> Controller Spec
	describe('<%= names.plural.humanized %> Controller Tests', function() {
		// Initialize global variables
		var <%= names.plural.classed %>Controller,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the <%= names.plural.humanized %> controller.
			<%= names.plural.classed %>Controller = $controller('<%= names.plural.classed %>Controller', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one <%= names.single.humanized %> object fetched from XHR', inject(function(<%= names.plural.classed %>) {
			// Create sample <%= names.single.humanized %> using the <%= names.plural.humanized %> service
			var sample<%= names.single.classed %> = new <%= names.plural.classed %>({
				name: 'New <%= names.single.humanized %>'
			});

			// Create a sample <%= names.plural.humanized %> array that includes the new <%= names.single.humanized %>
			var sample<%= names.plural.classed %> = [sample<%= names.single.classed %>];

			// Set GET response
			$httpBackend.expectGET('<%= names.plural.slug %>').respond(sample<%= names.plural.classed %>);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.<%= names.plural.camel %>).toEqualData(sample<%= names.plural.classed %>);
		}));

		it('$scope.findOne() should create an array with one <%= names.single.humanized %> object fetched from XHR using a <%= names.single.camel %>Id URL parameter', inject(function(<%= names.plural.classed %>) {
			// Define a sample <%= names.single.humanized %> object
			var sample<%= names.single.classed %> = new <%= names.plural.classed %>({
				name: 'New <%= names.single.humanized %>'
			});

			// Set the URL parameter
			$stateParams.<%= names.single.camel %>Id = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/<%= names.plural.slug %>\/([0-9a-fA-F]{24})$/).respond(sample<%= names.single.classed %>);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.<%= names.single.camel %>).toEqualData(sample<%= names.single.classed %>);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(<%= names.plural.classed %>) {
			// Create a sample <%= names.single.humanized %> object
			var sample<%= names.single.classed %>PostData = new <%= names.plural.classed %>({
				name: 'New <%= names.single.humanized %>'
			});

			// Create a sample <%= names.single.humanized %> response
			var sample<%= names.single.classed %>Response = new <%= names.plural.classed %>({
				_id: '525cf20451979dea2c000001',
				name: 'New <%= names.single.humanized %>'
			});

			// Fixture mock form input values
			scope.name = 'New <%= names.single.humanized %>';

			// Set POST response
			$httpBackend.expectPOST('<%= names.plural.slug %>', sample<%= names.single.classed %>PostData).respond(sample<%= names.single.classed %>Response);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the <%= names.single.humanized %> was created
			expect($location.path()).toBe('/<%= names.plural.slug %>/' + sample<%= names.single.classed %>Response._id);
		}));

		it('$scope.update() should update a valid <%= names.single.humanized %>', inject(function(<%= names.plural.classed %>) {
			// Define a sample <%= names.single.humanized %> put data
			var sample<%= names.single.classed %>PutData = new <%= names.plural.classed %>({
				_id: '525cf20451979dea2c000001',
				name: 'New <%= names.single.humanized %>'
			});

			// Mock <%= names.single.humanized %> in scope
			scope.<%= names.single.camel %> = sample<%= names.single.classed %>PutData;

			// Set PUT response
			$httpBackend.expectPUT(/<%= names.plural.slug %>\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/<%= names.plural.slug %>/' + sample<%= names.single.classed %>PutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid <%= names.single.camel %>Id and remove the <%= names.single.humanized %> from the scope', inject(function(<%= names.plural.classed %>) {
			// Create new <%= names.single.humanized %> object
			var sample<%= names.single.classed %> = new <%= names.plural.classed %>({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new <%= names.plural.humanized %> array and include the <%= names.single.humanized %>
			scope.<%= names.plural.camel %> = [sample<%= names.single.classed %>];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/<%= names.plural.slug %>\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sample<%= names.single.classed %>);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.<%= names.plural.camel %>.length).toBe(0);
		}));
	});
}());