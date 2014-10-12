;(function(){
'use strict';

  angular
    .module('core')
    .controller('HomeCtrl', HomeCtrl);

  /* @inject */
  function HomeCtrl(Resolved, $scope, Thing, socket, logger) {
    var vm = this;

    vm.awesomeThings = Resolved;
    vm.addThing = addThing;
    vm.deleteThing = deleteThing;



    socket.syncUpdates('things', vm.awesomeThings);

    ////////////////////

    function addThing() {
      if(vm.newThing === '') {
        return;
      }
      Thing.create( {name: vm.newThing} );
      vm.newThing = '';
    }

    function deleteThing(thing) {
      // console.log(thing)
      Thing.destroy(thing._id);
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('things');
    });
  }
}).call(this);
