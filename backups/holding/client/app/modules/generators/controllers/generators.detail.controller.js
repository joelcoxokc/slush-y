;(function(){
'use strict';

  // Generators controller
  angular
    .module('generators')
    .controller('GeneratorsDetailController', GeneratorsDetailController);

  /* @inject */
  function GeneratorsDetailController(resolvedDetail, $scope, $stateParams, $state, Generators, logger) {
    var vm = this;
    vm.remove = remove;
    vm.update = update;
    vm.generator = resolvedDetail;
    console.log(resolvedDetail)
    //////////////////////

    // Remove existing Generator
    function remove(generator) {
      vm.generator.remove()
        .then( function(){
          angular.forEach(vm.generators, function(item, i) {
            if (item._id === vm.generator._id) {
              vm.generators.splice(i, 1);
            }
          });
          $state.go('listGenerators');
        })
    }

    // Update existing Generator
    function update() {
      console.log(vm.generator)
      vm.generator.save()
        .then( function ( data ){
          logger.logSuccess('Generator Updated');
          $state.go('listGenerators.detail', {generatorId: vm.generator._id});
        })
        .catch( function (error){
          logger.logError('Error Updating Generator');
          vm.error = 'Error Updating Dog';

        });
    }
  }
}).call(this);