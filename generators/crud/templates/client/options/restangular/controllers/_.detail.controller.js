;(function(){
'use strict';

  // <%= names.plural.humanized %> controller
  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.plural.classed %>DetailController', <%= names.plural.classed %>DetailController);

  /* @inject */
  function <%= names.plural.classed %>DetailController(resolvedDetail, $scope, $stateParams, $state, <%= names.plural.classed %>, logger) {

    var vm;

    vm          = this;
    vm.remove   = remove;
    vm.update   = update;
    vm.<%= names.single.camel %> = resolvedDetail;

    //////////////////////

    // Remove existing <%= names.single.humanized %>
    function remove(<%= names.single.camel %>) {

      vm.<%= names.single.camel %>.remove()
        .then( function(){
          $state.go('<%= names.plural.camel %>');
        });

    }

    // Update existing <%= names.single.humanized %>
    function update() {

      vm.<%= names.single.camel %>.save()
        .then( function ( data ){
          $state.go('<%= names.plural.camel %>-detail', {<%= names.single.camel %>Id: vm.<%= names.single.camel %>._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
