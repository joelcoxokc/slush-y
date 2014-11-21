;(function(){
  'use strict';
  angular
    .module('administration')
    .controller('ProfileController', ProfileController);

  /* @inject */
  function ProfileController(Resolved, $scope, User, Auth, $state, logger) {
    var vm = this;
    vm.errors = {};
    vm.updateUser = updateUser;
    vm.changePassword = changePassword;

    vm.account = Resolved;

    console.log('User', vm.account);

    //////////////////////

    function updateUser(){
      User.update(vm.account._id, vm.account)
        .then( function ( data ){
          logger.logSuccess('User Updated');
          $state.go('admin.profile');
        })
        .catch( function (error){
          logger.logError('User not updated');
        })
    }

    function changePassword(form) {
      vm.submitted = true;
      if(form.$valid) {
        Auth.changePassword( vm.account.oldPassword, vm.account.newPassword )
        .then( function() {
          vm.message = 'Password successfully changed.';
          $state.go('admin.profile');
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
      }
    }
  }

}).call(this);