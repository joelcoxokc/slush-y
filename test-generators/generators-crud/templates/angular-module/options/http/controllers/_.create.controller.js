;(function(){
'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>CreateController', <%= classifiedPluralName %>CreateController);

  /* @inject */
  function <%= classifiedPluralName %>CreateController($scope, $state, <%= classifiedPluralName %>, logger) {

    var vm;

    vm        = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new <%= humanizedSingularName %>
    function create() {
      <%= classifiedPluralName %>.create({name:this.name})
        .then( function (response){
          // Redirect after save
          $state.go('<%= slugSingularName %>', {<%= camelizedSingularName %>Id: response.data._id});

        })
        .catch( function (error){
          $scope.error = error.data.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);