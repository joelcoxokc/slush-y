;(function(){
'use strict';
  //Generators service used to communicate Generators REST endpoints
  angular
    .module('generators')
    .factory('Generator', Generator);

    /* @inject */
    function Generators(Restangular) {
      return Restangular.service('generators');
    }
}).call(this);