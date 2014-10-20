;(function(){
'use strict';

  // Generators controller
  angular
    .module('generators')
    .controller('GeneratorsController', GeneratorsController);

  /* @inject */
  function GeneratorsController(resolvedList, $scope, $stateParams, $state, Generators, logger, socket) {

    var vm = this;
    // if($state.name !== 'listGenerators'){
    //   vm.showDetail = true;
    // }
    console.log($scope)
    vm.shown = {};
    vm.showGenerator = showGenerator;
    vm.createNewGenerator = createNewGenerator;
    // vm.generators = resolvedList;

    // socket.syncUpdates('generators', vm.generators);


    //////////////////////

    function showGenerator(generator){

        if(generator._id === vm.shown._id){
          $state.go('listGenerators');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('listGenerators.detail', {generatorId: generator._id});
          vm.shown = generator;
          vm.showDetail = true;
        }
    }

    function createNewGenerator(){
      $state.go('listGenerators.create');
      vm.showDetail = true;
      vm.shown = {};
      vm.creating = true;
    }

    $scope.$on('childClosed', function () {
      console.log('childClosed');
      vm.showDetail = false;
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('generators');
    });

  }
}).call(this);
