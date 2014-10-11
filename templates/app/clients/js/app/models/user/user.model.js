;(function(){
'use strict';
  angular
    .module('<%= slugifiedAppName %>')
    .factory('User', User);

  /* @inject */
  function User(Restangular){
    return Restangular.service('users');
  }

}).call(this);