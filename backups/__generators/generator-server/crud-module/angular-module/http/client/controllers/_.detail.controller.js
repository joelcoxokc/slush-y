;(function(){
'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>DetailController', <%= classifiedPluralName %>DetailController);

  /* @inject */
  function <%= classifiedPluralName %>DetailController(resolvedDetail, $scope, $stateParams, $state, <%= classifiedPluralName %>, logger) {

    $scope.remove = remove;
    $scope.update = update;
    $scope.<%= camelizedSingularName %> = resolvedDetail;

    //////////////////////

    // Remove existing <%= humanizedSingularName %>
    function remove(<%= camelizedSingularName %>) {
      var <%= camelizedSingularName %> = <%= camelizedSingularName %> || $scope.<%= camelizedSingularName %>;
      <%= classifiedPluralName %>.destroy(<%= camelizedSingularName %>._id)
        .then( function(){
          angular.forEach($scope.<%= camelizedPluralName %>, function(item, i) {
            if (item === <%= camelizedSingularName %>) {
              $scope.<%= camelizedPluralName %>.splice(i, 1);
            }
          });
          $state.go('list<%= classifiedPluralName %>');
        });

    }

    // Update existing <%= humanizedSingularName %>
    function update() {
      var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;
      <%= classifiedPluralName %>.update(<%= camelizedSingularName %>._id, <%= camelizedSingularName %>)
        .then( function ( data ){
          logger.logSuccess('<%= classifiedSingularName %> Updated');
          $state.go('view<%= classifiedSingularName %>', {<%= camelizedSingularName %>Id: <%= camelizedSingularName %>._id});
        })
        .catch( function (error){
          logger.logError('Error Updating <%= classifiedSingularName %>');
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);