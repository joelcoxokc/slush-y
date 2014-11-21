;(function(){
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .controller('<%= classifiedControllerName %>Controller', <%= classifiedControllerName %>Controller);

  /* @inject */
  function <%= classifiedControllerName %>Controller($scope) {
    // <%= humanizedControllerName %> controller logic
    // ...
  }
}).call(this);