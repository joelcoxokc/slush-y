;(function(){
'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>Controller', <%= classifiedPluralName %>Controller);

  /* @inject */
  function <%= classifiedPluralName %>Controller(resolvedList, $scope, $stateParams, $state, <%= classifiedPluralName %>, logger) {

    $scope.find = find;
    $scope.findOne = findOne;
    $scope.<%= camelizedPluralName %> = resolvedList;


    //////////////////////

    // Find a list of <%= humanizedPluralName %>
    function find() {
      <%= classifiedPluralName %>.all()
        .then( function ( response ){
          $scope.<%= camelizedPluralName %> = response.data;
        })
    }

    // Find existing <%= humanizedSingularName %>
    function findOne() {
      <%= classifiedPluralName %>.one($stateParams.<%= camelizedSingularName %>Id)
        .then( function ( response ){
          $scope.<%= camelizedSingularName %> = response.data[0];
        });
    }
  }
}).call(this);