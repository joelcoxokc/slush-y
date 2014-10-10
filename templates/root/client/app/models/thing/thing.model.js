;(function(){
'use strict';

  angular
    .module('yoSoaApp')
    .factory('Thing', Thing);
    /* @inject */
    function Thing(Restangular) {
      return Restangular.service('things');
    }

}).call(this);
