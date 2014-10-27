;(function(){
'use strict';

  // <%= names.plural.humanized %> controller
  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.plural.classed %>CreateController', <%= names.plural.classed %>CreateController);

  /* @inject */
  function <%= names.plural.classed %>CreateController($scope, $state, <%= names.plural.classed %>, logger) {

    var vm;

    vm        = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new <%= names.single.humanized %>
    function create() {
      <%= names.plural.classed %>.create({name:this.name})
        .then( function (response){
          // Redirect after save
          $state.go('<%= names.single.camel %>', {<%= names.single.camel %>Id: response.data._id});

        })
        .catch( function (error){
          $scope.error = error.data.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);