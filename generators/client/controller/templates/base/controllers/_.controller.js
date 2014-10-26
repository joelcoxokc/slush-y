;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.single.classed %>Controller', <%= names.single.classed %>Controller);

  /* @inject */
  function <%= names.single.classed %>Controller($scope) {
    // <%= names.single.humanized %> controller logic
    // ...
  }
}).call(this);