;(function(){
'use strict';

  // Contacts controller
  angular
    .module('contacts')
    .controller('ContactsCreateController', ContactsCreateController);

  /* @inject */
  function ContactsCreateController($scope, $state, Contacts, logger) {

    var vm;

    vm        = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new Contact
    function create() {
      Contacts.create( vm.contact )
        .then( function (response){
          // Redirect after save
          $state.go('contacts', {contactId: response._id});

        })
        .catch( function (error){
          $scope.error = error.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);