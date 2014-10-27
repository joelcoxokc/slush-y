;(function(){
'use strict';

  // <%= names.plural.humanized %> controller
  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.plural.classed %>Controller', <%= names.plural.classed %>Controller);

  /* @inject */
  function <%= names.plural.classed %>Controller(resolvedList, $scope, $stateParams, $state, <%= names.plural.classed %>, logger, socket) {


    var vm = this;
    vm.<%= names.plural.camel %> = resolvedList;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('<%= names.plural.camel %>', vm.<%= names.plural.camel %>);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.<%= names.single.camel %>Id)
      return $state.includes('<%= names.plural.camel %>', {<%= names.plural.camel %>Id: state});
    }

    // show <%= names.plural.humanized %>
    function showArticle(<%= names.single.camel %>){
        if(article._id === vm.shown._id){
          $state.go('<%= names.plural.camel %>');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('<%= names.plural.camel %>.detail', {<%= names.plural.camel %>Id: <%= names.plural.camel %>._id});
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
      socket.unsyncUpdates('<%= names.plural.camel %>');
    });
  }
}).call(this);