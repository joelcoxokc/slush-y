'use strict';

(function() {
	// Generators Controller Spec
	describe('Generators Controller Tests', function() {
		// Initialize global variables
		var GeneratorsController,
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

			// Initialize the Generators controller.
			GeneratorsController = $controller('GeneratorsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Generator object fetched from XHR', inject(function(Generators) {
			// Create sample Generator using the Generators service
			var sampleGenerator = new Generators({
				name: 'New Generator'
			});

			// Create a sample Generators array that includes the new Generator
			var sampleGenerators = [sampleGenerator];

			// Set GET response
			$httpBackend.expectGET('generators').respond(sampleGenerators);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generators).toEqualData(sampleGenerators);
		}));

		it('$scope.findOne() should create an array with one Generator object fetched from XHR using a generatorId URL parameter', inject(function(Generators) {
			// Define a sample Generator object
			var sampleGenerator = new Generators({
				name: 'New Generator'
			});

			// Set the URL parameter
			$stateParams.generatorId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/generators\/([0-9a-fA-F]{24})$/).respond(sampleGenerator);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.generator).toEqualData(sampleGenerator);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Generators) {
			// Create a sample Generator object
			var sampleGeneratorPostData = new Generators({
				name: 'New Generator'
			});

			// Create a sample Generator response
			var sampleGeneratorResponse = new Generators({
				_id: '525cf20451979dea2c000001',
				name: 'New Generator'
			});

			// Fixture mock form input values
			scope.name = 'New Generator';

			// Set POST response
			$httpBackend.expectPOST('generators', sampleGeneratorPostData).respond(sampleGeneratorResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Generator was created
			expect($location.path()).toBe('/generators/' + sampleGeneratorResponse._id);
		}));

		it('$scope.update() should update a valid Generator', inject(function(Generators) {
			// Define a sample Generator put data
			var sampleGeneratorPutData = new Generators({
				_id: '525cf20451979dea2c000001',
				name: 'New Generator'
			});

			// Mock Generator in scope
			scope.generator = sampleGeneratorPutData;

			// Set PUT response
			$httpBackend.expectPUT(/generators\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/generators/' + sampleGeneratorPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid generatorId and remove the Generator from the scope', inject(function(Generators) {
			// Create new Generator object
			var sampleGenerator = new Generators({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Generators array and include the Generator
			scope.generators = [sampleGenerator];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/generators\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGenerator);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.generators.length).toBe(0);
		}));
	});
}());