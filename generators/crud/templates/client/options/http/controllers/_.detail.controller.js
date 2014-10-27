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
      var <%= names.single.camel %> = <%= names.single.camel %> || $scope.<%= names.single.camel %>;
      <%= names.plural.classed %>.destroy(<%= names.single.camel %>._id)
        .then( function(){
          $state.go('<%= names.plural.camel %>');
        });

    }

    // Update existing <%= names.single.humanized %>
    function update() {
      var <%= names.single.camel %> = $scope.<%= names.single.camel %>;
      <%= names.plural.classed %>.update(<%= names.single.camel %>._id, <%= names.single.camel %>)
        .then( function ( data ){
          $state.go('<%= names.single.camel %>-detail', {<%= names.single.camel %>Id: <%= names.single.camel %>._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
