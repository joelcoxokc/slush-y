'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('core'));
  beforeEach(module('socketMock'));

  var HomeCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, serverUrl) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(serverUrl+'things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl as vm', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.vm.awesomeThings.length).toBe(4);
  });
});
