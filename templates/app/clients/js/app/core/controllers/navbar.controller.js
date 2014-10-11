;(function(){
'use strict';

angular
  .module('core')
  .controller('NavbarCtrl', NavbarCtrl);

  /* @inject */
  function NavbarCtrl($scope, $location, Auth) {
    var vm = this;
    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.logout = logout;
    vm.isActive = isActive;

    function logout() {
      Auth.logout();
      $location.path('/login');
    }

    function isActive(route) {
      return route === $location.path();
    }
  }
}).call(this);