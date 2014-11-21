;(function(){
  'use strict';
  angular
    .module('administration')
    .controller('AdminController', AdminController);

  /* @inject */
  function AdminController($scope, Auth, User, resolvedUsers, $location) {
    var vm = this;
    vm.details = false;
    vm.currentUser = null;
    vm.users = resolvedUsers;
    vm.destroy = destroy;
    vm.showUser = showUser;
    vm.hideUser = hideUser;

    //////////////

    function showUser(user){
      if(vm.currentUser && vm.currentUser._id === user._id) {
        return hideUser();
      }
      vm.currentUser = user;
      vm.details = true;
    }
    function hideUser(){
      vm.currentUser = null;
      vm.details = false;
    }

    function destroy(user) {
      var id = user._id;
      User.destroy(id)
        .then(function(){
          removeUserFromScope(id)
        });
    }

    function removeUserFromScope(id){
      angular.forEach(vm.users, function (item, i) {
        if (item._id === id) {
          vm.users.splice(i, 1);
        }
      });
    }
  }

}).call(this);