;(function(){
  'use strict';

  angular
    .module('authentication')
    .config( AuthRoutes );

  /* @inject */
  function AuthRoutes($stateProvider) {
    // Users state routing
    $stateProvider
      .state('profile', {
        url: '/settings/profile',
        templateUrl: 'app/authentication/views/settings/edit-profile.client.view.html',
        controller: 'SettingsCtrl as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('password', {
        url: '/settings/password',
        templateUrl: 'app/authentication/views/settings/change-password.view.html',
        controller: 'SettingsCtrl as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('accounts', {
        url: '/settings/accounts',
        templateUrl: 'app/authentication/views/settings/social-accounts.client.view.html',
        authenticate:true
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/authentication/views/signup.view.html',
        controller: 'SignupCtrl as vm'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/authentication/views/login.view.html',
        controller: 'LoginCtrl as vm'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/authentication/views/admin/admin.view.html',
        controller: 'AdminCtrl as vm',
        authenticate:true,
        resolve: {
          resolvedUsers: resolvedUsers
        }
      });
      ////////////////


    /* @inject */
    function Resolved(User){
      return User.one('me').get()
        .then(function ( response ){
          return response;
        });
    }
    /* @inject */
    function resolvedUsers(User){
      return User.getList()
        .then(function ( response ){
          return response;
        });
    }
  }

}).call(this);