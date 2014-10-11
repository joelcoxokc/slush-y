;(function(){
'use strict';
  angular
    .module('<%= slugifiedAppName %>')
    .config( account );

  /* @inject */
  function account($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/states/account/login/login.html',
        controller: 'LoginCtrl as vm'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/states/account/signup/signup.html',
        controller: 'SignupCtrl as vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/states/account/settings/settings.html',
        controller: 'SettingsCtrl as vm',
        authenticate: true
      });
  }
}).call(this);