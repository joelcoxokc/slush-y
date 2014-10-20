;(function(){
'use strict';
  angular
    .module('core')
    .factory('User', User);

  /* @inject */
  function User(Restangular){
    return Restangular.service('users');
  }

}).call(this);