;(function(){
'use strict';

  // Generators controller
  angular
    .module('generators')
    .controller('GeneratorsDetailController', GeneratorsDetailController);

  /* @inject */
  function GeneratorsDetailController(resolvedDetail) {
    var vm = this;

    vm.generator = resolvedDetail;

    //////////////////////

  }
}).call(this);