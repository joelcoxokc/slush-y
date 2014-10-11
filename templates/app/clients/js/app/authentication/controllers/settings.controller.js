;(function(){
'use strict';

angular
  .module('authentication')
  .controller('SettingsCtrl', SettingsCtrl);

  /* @inject */
  function SettingsCtrl($scope, User, Auth) {
    var vm = this;
    vm.errors = {};
    vm.updateUser = updateUser;
    vm.changePassword = changePassword;

    vm.user = Auth.user;

    console.log('User', vm.user);

    //////////////////////

    function updateUser(){
      vm.user.save();
    }

    function changePassword(form) {
      vm.submitted = true;
      if(form.$valid) {
        Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
        .then( function() {
          vm.message = 'Password successfully changed.';
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