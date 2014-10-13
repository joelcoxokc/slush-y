;(function(){
'use strict';
angular
  .module('app.modules', [
  'authentication',
  'administration'

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