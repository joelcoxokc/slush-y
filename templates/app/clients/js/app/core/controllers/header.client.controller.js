;(function(){


  'use strict';
  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  /* @inject */
  function HeaderController($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');

    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
  }
}).call(this);