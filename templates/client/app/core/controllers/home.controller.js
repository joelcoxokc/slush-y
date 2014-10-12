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
    }

    function deleteThing(thing) {
      vm.awesomeThings.one(thing._id).remove();
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

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('things');
    });
  }
}).call(this);
