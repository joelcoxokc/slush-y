;(function(){
  'use strict';
  angular
    .module('<%= slugifiedModuleName %>')
    .controller('<%= classifiedControllerName %>Controller', <%= classifiedControllerName %>Controller);

  /* @inject */
  function <%= classifiedControllerName %>Controller($scope) {
      // Controller Logic
      // ...

  }
}).call(this);