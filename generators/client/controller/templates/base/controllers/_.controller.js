;(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .controller('<%= names.classed %>Controller', <%= names.classed %>Controller);

  /* @inject */
  function <%= names.classed %>Controller($scope) {
    // <%= names.humanized %> controller logic
    // ...
  }
}).call(this);