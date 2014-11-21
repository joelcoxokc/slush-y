;(function(){
  'use strict';

  angular
    .module('administration')
    .directive('adminNav', adminNav);

  /* @inject */
  function adminNav(User, Auth) {
    return {
      templateUrl: 'app/modules/administration/directives/admin-nav/admin-nav.view.html',
      restrict: 'E',
      link: postLink
    };

    //////////

    function postLink(scope, element, attrs) {
      // Admin nav directive logic
      // ...

      scope.isAdmin = Auth.isAdmin;
      User.all()
        .then( function (response){
          scope.users = response.data;
        });
    }
  }
}).call(this);
