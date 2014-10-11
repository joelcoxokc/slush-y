;(function(){
'use strict';

  angular
    .module('<%= slugifiedAppName %>')
    .factory('Thing', Thing);
    /* @inject */
    function Thing(Restangular) {
      return Restangular.service('things');
    }

}).call(this);
