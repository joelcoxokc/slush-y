;(function(){
  'use strict';

  // Generators controller
  angular
    .module('generators')
    .controller('GeneratorsController', GeneratorsController);

  /* @inject */
  function GeneratorsController(resolvedList, $scope, $state, Generator) {

    var vm;

    vm                = this;
    vm.shown          = {};
    vm.showDetail     = false;
    vm.showGenerator  = showGenerator;
    vm.generators     = resolvedList;

    //////////////////////

    function showGenerator(generator){

        if(generator._id === vm.shown._id){
          $state.go('generators');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('generators.detail', {generatorId: generator._id});
          vm.shown = generator;
          vm.showDetail = true;
        }
    }

    $scope.$on('childClosed', function () {
      vm.showDetail = false;
    });

  }
}).call(this);
