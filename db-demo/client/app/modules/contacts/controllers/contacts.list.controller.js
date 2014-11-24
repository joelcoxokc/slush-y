;(function(){
'use strict';

  // Contacts controller
  angular
    .module('contacts')
    .controller('ContactsController', ContactsController);

  /* @inject */
  function ContactsController(resolvedList, $scope, $stateParams, $state, Contacts, logger, socket) {


    var vm = this;
    vm.contacts = resolvedList;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('contacts', vm.contacts);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.contactId)
      return $state.includes('contacts', {contactsId: state});
    }

    // show Contacts
    function showArticle(contact){
        if(article._id === vm.shown._id){
          $state.go('contacts');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('contacts.detail', {contactsId: contacts._id});
          vm.shown = article;
          // vm.showDetail = true;
        }
    }
    /*
        Event emitted from child states.
     */
    $scope.$on('child:closed', function ( event ){
      vm.shown = {};
      vm.showDetail = false;
    });
    $scope.$on('child:opened', function ( event ){
      vm.shown = {};
      vm.showDetail = true;
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('contacts');
    });
  }
}).call(this);