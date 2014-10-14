;(function(){
'use strict';

  // Generators controller
  angular
    .module('generators')
    .controller('GeneratorsCreateController', GeneratorsCreateController);

  /* @inject */
  function GeneratorsCreateController($scope, $state, Generators, logger) {
    var vm = this;
    vm.create = create;

    //////////////////////

    // Create new Generator
    function create() {
      Generators.post({name:this.name})
        .then( function (response){
          logger.logSuccess('Generator Saved!!')
          // Redirect after save
          $state.go('viewGenerator', {generatorId: response._id});

        })
        .catch( function (error){
          logger.logError('Generator not saved')
          vm.error = error.message;
        })
      // Clear form fields
      this.name = '';
    }
    $scope.$on('$destroy', function () {
      $scope.$emit('childClosed');
    });


  }
}).call(this);