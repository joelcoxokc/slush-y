;(function(){
  'use strict';

  angular
    .module('administration')
    .controller('SettingsController', SettingsController);

  /* @inject */
  function SettingsController(Resolved, $scope, $state, Auth) {
    var vm = this;
    vm.errors = {};
    vm.changePassword = changePassword;
    vm.user = Resolved;

    ///////////////////////

    function changePassword(form) {
      vm.submitted = true;
      if(form.$valid) {
        Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
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