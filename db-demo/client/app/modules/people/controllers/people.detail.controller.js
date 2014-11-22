;(function(){
'use strict';

  // People controller
  angular
    .module('people')
    .controller('PeopleDetailController', PeopleDetailController);

  /* @inject */
  function PeopleDetailController(resolvedDetail, $scope, $stateParams, $state, People, logger) {

    var vm;

    vm          = this;
    vm.remove   = remove;
    vm.update   = update;
    vm.person = resolvedDetail;

    //////////////////////

    // Remove existing Person
    function remove(person) {
      var person = person || vm.person;
      People.destroy(person._id)
        .then( function(){
          $state.go('people');
        });

    }

    // Update existing Person
    function update() {
      var person = vm.person;
      People.update(person._id, person)
        .then( function ( data ){
          $state.go('people-detail', {personId: person._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
