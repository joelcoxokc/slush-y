;(function(){
'use strict';

angular
  .module('authentication')
  .controller('ProfileCtrl', ProfileCtrl);

  /* @inject */
  function ProfileCtrl($scope, User, Auth) {
    var vm = this;
    vm.errors = {};
    vm.changePassword = changePassword;

    //////////////////////

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