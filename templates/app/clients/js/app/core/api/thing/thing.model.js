;(function(){
'use strict';

  angular
    .module('core')
    .factory('Thing', Thing);
    /* @inject */
    function Thing(Restangular) {
      return Restangular.service('things');
    }

}).call(this);
