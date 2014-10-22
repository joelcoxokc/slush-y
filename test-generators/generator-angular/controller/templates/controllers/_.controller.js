;(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .controller('<%= classControllerName %>Controller', <%= classControllerName %>Controller);

  /* @inject */
  function <%= classControllerName %>Controller($scope) {
    // <%= humanizedControllerName %> controller logic
    // ...
  }
}).call(this);