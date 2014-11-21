;(function(){
  'use strict';
  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= answers.controllerNames.classed %>Controller', <%= answers.controllerNames.classed %>Controller);

  /* @inject */
  function <%= answers.controllerNames.classed %>Controller($scope) {
      // Controller Logic
      // ...

  }
}).call(this);