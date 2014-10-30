;(function(){
'use strict';

  angular
    .module('core')
    .controller('HomeCtrl', HomeCtrl);

  /* @inject */
  function HomeCtrl($scope, Thing, socket) {
    var vm = this;
    vm.awesomeThings = [];
    vm.shown = {};
    vm.getThings = getThings;
    vm.addThing = addThing;
    vm.deleteThing = deleteThing;
    vm.showThing = showThing;
    vm.createNewThing = createNewThing;

    vm.getThings();


    ////////////////////
    function getThings(){
      Thing
        .getList()
        .then(function (data){
          vm.awesomeThings = data;
          socket.syncUpdates('things', vm.awesomeThings);
        });
    }

    function addThing() {
      if(vm.newThing === '') {
        return;
      }
      vm.awesomeThings.post({name: vm.newThing});
      vm.newThing = '';
      vm.showDetail = false;
      vm.creating = false;
      vm.shown = {};
    }

    function deleteThing(thing) {
      vm.awesomeThings.one(thing._id).remove();
      vm.showDetail = false;
      vm.editing = false;
    }


    function showThing(thing){

        if(thing._id === vm.shown._id){
          vm.showDetail = false;
          vm.shown = {};
        } else {
          vm.showDetail = true;
          vm.shown = thing;
        }
    }

    function createNewThing(){
      vm.showDetail = true;
      vm.shown = {};
      vm.creating = true;
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('things');
    });
  }
}).call(this);
