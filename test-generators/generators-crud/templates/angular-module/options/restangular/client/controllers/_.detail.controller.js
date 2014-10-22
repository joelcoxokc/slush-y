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
      $scope.<%= camelizedSingularName %>.remove()
        .then( function(){
          angular.forEach($scope.<%= camelizedPluralName %>, function(item, i) {
            if (item._id === $scope.<%= camelizedSingularName %>._id) {
              $scope.<%= camelizedPluralName %>.splice(i, 1);
            }
          });
          $state.go('list<%= classifiedPluralName %>');
        })
    }

    // Update existing <%= humanizedSingularName %>
    function update() {
      $scope.<%= camelizedSingularName %>.save()
        .then( function ( data ){
          logger.logSuccess('<%= classifiedSingularName %> Updated');
          $state.go('view<%= classifiedSingularName %>', {<%= camelizedSingularName %>Id: $scope.<%= camelizedSingularName %>._id});
        })
        .catch( function (error){
          logger.logError('Error Updating <%= classifiedSingularName %>');
          $scope.error = 'Error Updating Dog';

        });
    }
  }
}).call(this);