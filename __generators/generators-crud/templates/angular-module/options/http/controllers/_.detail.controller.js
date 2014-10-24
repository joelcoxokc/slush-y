;(function(){
'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>DetailController', <%= classifiedPluralName %>DetailController);

  /* @inject */
  function <%= classifiedPluralName %>DetailController(resolvedDetail, $scope, $stateParams, $state, <%= classifiedPluralName %>, logger) {

    var vm;

    vm          = this;
    vm.remove   = remove;
    vm.update   = update;
    vm.<%= camelizedSingularName %> = resolvedDetail;

    //////////////////////

    // Remove existing <%= humanizedSingularName %>
    function remove(<%= camelizedSingularName %>) {
      var <%= camelizedSingularName %> = <%= camelizedSingularName %> || $scope.<%= camelizedSingularName %>;
      <%= classifiedPluralName %>.destroy(<%= camelizedSingularName %>._id)
        .then( function(){
          $state.go('<%= camelizedPluralName %>');
        });

    }

    // Update existing <%= humanizedSingularName %>
    function update() {
      var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;
      <%= classifiedPluralName %>.update(<%= camelizedSingularName %>._id, <%= camelizedSingularName %>)
        .then( function ( data ){
          $state.go('<%= camelizedSingularName %>-detail', {<%= camelizedSingularName %>Id: <%= camelizedSingularName %>._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
