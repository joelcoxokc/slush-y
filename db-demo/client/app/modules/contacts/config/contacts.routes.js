;(function(){
'use strict';

  //Setting up route
  angular
    .module('contacts')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/modules/contacts/views/contacts.view.html',
        controller: 'ContactsController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('contacts-create', {
        url: '/contacts/create',
        templateUrl: 'app/modules/contacts/views/contacts.create.view.html',
        controller: 'ContactsCreateController as vm'
      })
      .state('contacts.detail', {
        url: '/:contactId',
        templateUrl: 'app/modules/contacts/views/contacts.detail.view.html',
        controller: 'ContactsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('contacts-edit', {
        url: '/contact/:contactId/edit',
        templateUrl: 'app/modules/contacts/views/contacts.edit.view.html',
        controller: 'ContactsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////

    /**
     * [resolvedDetail description]
     * @return {[type]}    [description]
     */
    function resolvedDetail($stateParams, Contacts){
      return Contacts.one($stateParams.contactId)
        .then( function ( response ){
          return response.data;
        })
    }

    /**
     * [resolvedList description]
     * @return {[type]}     [description]
     */
    function resolvedList(Contacts){
      return Contacts.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);