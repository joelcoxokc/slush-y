;(function(){
'use strict';

  angular
    .module('core')
    .controller('FeatureCtrl', FeatureCtrl);

  /* @inject */
  function FeatureCtrl(Resolved, $scope, Thing, socket, logger, $state) {
    var vm = this;
    vm.thing = Resolved;
    vm.deleteThing = deleteThing;
    vm.showThing = showThing;
    vm.updateThing = updateThing;
    vm.addThing = addThing;



    // socket.syncUpdates('things', vm.awesomeThings);

    ////////////////////

    function addThing() {
      if(vm.newThing === '') {
        return;
      }
      Thing
        .create( {name: vm.newThing.name, info:vm.newThing.info} )
        .then(function(){
          $state.go('home.features')
        })

      vm.newThing = '';
    }

    function deleteThing(thing) {
      // console.log(thing)
      Thing
        .destroy(thing._id)
        .then(function(){
          $state.go('home.features');
        });

    }

    function updateThing(thing){
      Thing
        .update(thing._id, thing)
        .then( function (data) {
          $state.go('home.detail', {id:thing._id});
        });
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


  }
}).call(this);
