;(function(){
'use strict';

  angular
    .module('yoSoaApp')
    .controller('MainCtrl', MainCtrl);

  /* @inject */
  function MainCtrl($scope, Thing, socket) {
    var vm = this;
    vm.awesomeThings = [];
    vm.getThings = getThings;
    vm.addThing = addThing;
    vm.deleteThing = deleteThing;

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

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('things');
    });
  }
}).call(this);
