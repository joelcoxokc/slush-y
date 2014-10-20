;(function(){
'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>CreateController', <%= classifiedPluralName %>CreateController);

  /* @inject */
  function <%= classifiedPluralName %>CreateController($scope, $state, <%= classifiedPluralName %>, logger) {

    $scope.create = create;

    //////////////////////

    // Create new <%= humanizedSingularName %>
    function create() {
      <%= classifiedPluralName %>.post({name:this.name})
        .then( function (response){
          logger.logSuccess('<%= classifiedSingularName %> Saved!!')
          // Redirect after save
          $state.go('view<%= classifiedSingularName %>', {<%= camelizedSingularName %>Id: response._id});

        })
        .catch( function (error){
          logger.logError('<%= classifiedSingularName %> not saved')
          $scope.error = error.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);