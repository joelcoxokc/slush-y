;(function(){
'use strict';
  angular
    .module('authentication')
    .controller('LoginCtrl', LoginCtrl);

    /* @inject */
    function LoginCtrl($scope, Auth, $location, $window) {
      var vm = this;
      vm.user = {};
      vm.errors = {};
      vm.login = login;
      vm.loginOauth = loginOauth;

      ///////////////////////

      function login(form) {
        vm.submitted = true;

        if(form.$valid) {
          Auth.login({
            email: vm.user.email,
            password: vm.user.password
          })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            vm.errors.other = err.message;
          });
        }
      }

      function loginOauth(provider) {
        $window.location.href = '/auth/' + provider;
      }
    }

}).call(this);
