;(function(){
'use strict';
  angular
    .module('yoSoaApp')
    .factory('User', User);

  /* @inject */
  function User(Restangular){
    return Restangular.service('users');
  }

}).call(this);