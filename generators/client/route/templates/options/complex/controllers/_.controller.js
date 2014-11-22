;(function(){
  'use strict';
  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= controllerNames.classed %>Controller', <%= controllerNames.classed %>Controller);

  /* @inject */
  function <%= controllerNames.classed %>Controller($scope) {
      // Controller Logic
      // ...

  }
}).call(this);