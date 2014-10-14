;(function(){
'use strict';
  //Generators service used to communicate Generators REST endpoints
  angular
    .module('generators')
    .factory('Generators', Generators);

    /* @inject */
    function Generators(Restangular) {
      return Restangular.service('generators');
    }
}).call(this);