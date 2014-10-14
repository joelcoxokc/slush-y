;(function(){
  'use strict';

  angular
    .module('authentication')
    .config( AuthRoutes );

  /* @inject */
  function AuthRoutes($stateProvider) {
    // Users state routing
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/modules/authentication/views/signup.view.html',
        controller: 'SignupCtrl as vm'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/modules/authentication/views/login.view.html',
        controller: 'LoginCtrl as vm'
      });
  }

}).call(this);