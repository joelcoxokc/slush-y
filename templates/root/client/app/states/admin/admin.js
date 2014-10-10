;(function(){
'use strict';

  angular
    .module('yoSoaApp')
    .config( admin );

  /* @inject */
  function admin($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/states/admin/admin.html',
        controller: 'AdminCtrl as vm',
        resolve: {
          resolvedUsers: resolvedUsers
        }
      });
    /* @inject */
    function resolvedUsers(User){
      return User.getList()
        .then(function (data){
          console.log('resolved', data);
          return data;
        });
    }
  }
}).call(this);