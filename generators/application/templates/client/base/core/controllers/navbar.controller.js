;(function(){
'use strict';

angular
  .module('core')
  .controller('NavbarCtrl', NavbarCtrl);

  /* @inject */
  function NavbarCtrl($scope, $location, Auth, Menus, $state) {
    var vm = this;
    // vm.menu = [
    //   {
    //   'title': 'Home',
    //   'link': '/',
    //   'color': 'pink-400'
    //   },{
    //   'title': 'Generators',
    //   'link': '/generators',
    //   'color': 'blue-500'
    //   }
    // ];
    vm.menu = Menus.get();
    vm.toggle = function(){
      $('#dr3').dropdown('toggle')
    }

    // $scope.menu = Menus.getMenu('topbar');


    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.logout = logout;
    vm.isActive = isActive;

    function logout() {
      Auth.logout();
      $location.path('/signout');
    }

    function isActive(state) {
      return $state.includes(state);
    }
  }
}).call(this);