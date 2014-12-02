;(function(){
'use strict';

  // People controller
  angular
    .module('people')
    .controller('PeopleController', PeopleController);

  /* @inject */
  function PeopleController(resolvedList, $scope, $stateParams, $state, People, logger, socket) {


    var vm = this;
    vm.people = resolvedList;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('people', vm.people);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.personId)
      return $state.includes('people', {peopleId: state});
    }

    // show People
    function showArticle(person){
        if(article._id === vm.shown._id){
          $state.go('people');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('people.detail', {peopleId: people._id});
          vm.shown = article;
          // vm.showDetail = true;
        }
    }
    /*
        Event emitted from child states.
     */
    $scope.$on('child:closed', function ( event ){
      vm.shown = {};
      vm.showDetail = false;
    });
    $scope.$on('child:opened', function ( event ){
      vm.shown = {};
      vm.showDetail = true;
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('people');
    });
  }
}).call(this);