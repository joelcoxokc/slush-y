;(function(){
'use strict';

angular
  .module('authentication')
  .controller('SettingsCtrl', SettingsCtrl);

  /* @inject */
  function SettingsCtrl(Resolved, $scope, User, Auth, $state, logger) {
    var vm = this;
    vm.errors = {};
    vm.updateUser = updateUser;
    vm.changePassword = changePassword;

    vm.user = Resolved;

    console.log('User', vm.user);

    //////////////////////

    function updateUser(){
      vm.user.save()
        .then( function ( data ){
          logger.logSuccess('User Updated');
          $state.go('admin');
        })
        .catch( function (error){
          logger.logError('User not updated');
        })
    }

    function changePassword(form) {
      vm.submitted = true;
      if(form.$valid) {
        Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
        .then( function() {
          vm.message = 'Password successfully changed.';
          $state.go('admin');
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