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
    <% if(restangular){ %>
    vm.user = Auth.user;<% } %><% if(http){ %>
    vm.user = Auth.getCurrentUser();<% } %>

    console.log('User', vm.user);

    //////////////////////

    function updateUser(){<% if(restangular){ %>
      vm.user.save();<% } %><% if(http){ %>
      User.update(vm.user._id, vm.user);<% } %>
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