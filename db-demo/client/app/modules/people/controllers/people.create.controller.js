;(function(){
'use strict';

  // People controller
  angular
    .module('people')
    .controller('PeopleCreateController', PeopleCreateController);

  /* @inject */
  function PeopleCreateController($scope, $state, People, logger) {

    var vm;

    vm        = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new Person
    function create() {
      People.create( vm.person )
        .then( function (response){
          // Redirect after save
          $state.go('people', {personId: response._id});

        })
        .catch( function (error){
          $scope.error = error.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);