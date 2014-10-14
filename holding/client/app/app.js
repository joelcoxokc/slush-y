;(function(){
'use strict';
angular
  .module('beast', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'restangular',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'core',
  'app.modules'

  ])
  .run( run );

  /* @inject */
  function run($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/signin');
        }
      });
    });
  }

}).call(this);