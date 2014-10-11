;(function(){
  'use strict';

  angular
    .module('users')
    .config( UserRoutes );

  /* @inject */
  function UserRoutes($stateProvider) {
    // Users state routing
    $stateProvider.
    state('profile', {
      url: '/settings/profile',
      templateUrl: 'app/states/users/views/settings/edit-profile.client.view.html'
    }).
    state('password', {
      url: '/settings/password',
      templateUrl: 'app/states/users/views/settings/change-password.view.html',
      controller: 'SettingsCtrl as vm'
    }).
    state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'app/states/users/views/settings/social-accounts.client.view.html'
    }).
    state('signup', {
      url: '/signup',
      templateUrl: 'app/states/users/views/signup.view.html',
      controller: 'SignupCtrl as vm'
    }).
    state('signin', {
      url: '/signin',
      templateUrl: 'app/states/users/views/login.view.html',
      controller: 'LoginCtrl as vm'
    });
  }

}).call(this);