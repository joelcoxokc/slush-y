;(function(){
'use strict';

  // Contacts controller
  angular
    .module('contacts')
    .controller('ContactsDetailController', ContactsDetailController);

  /* @inject */
  function ContactsDetailController(resolvedDetail, $scope, $stateParams, $state, Contacts, logger) {

    var vm;

    vm          = this;
    vm.remove   = remove;
    vm.update   = update;
    vm.contact = resolvedDetail;

    //////////////////////

    // Remove existing Contact
    function remove(contact) {
      var contact = contact || vm.contact;
      Contacts.destroy(contact._id)
        .then( function(){
          $state.go('contacts');
        });

    }

    // Update existing Contact
    function update() {
      var contact = vm.contact;
      Contacts.update(contact._id, contact)
        .then( function ( data ){
          $state.go('contacts-detail', {contactId: contact._id});
        })
        .catch( function (error){
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
