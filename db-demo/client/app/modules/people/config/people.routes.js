;(function(){
'use strict';

  //Setting up route
  angular
    .module('people')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/modules/people/views/people.view.html',
        controller: 'PeopleController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('people-create', {
        url: '/people/create',
        templateUrl: 'app/modules/people/views/people.create.view.html',
        controller: 'PeopleCreateController as vm'
      })
      .state('people-detail', {
        url: '/person/:personId',
        templateUrl: 'app/modules/people/views/people.detail.view.html',
        controller: 'PeopleDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('people-edit', {
        url: '/person/:personId/edit',
        templateUrl: 'app/modules/people/views/people.edit.view.html',
        controller: 'PeopleDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////

    /**
     * [resolvedDetail description]
     * @return {[type]}    [description]
     */
    function resolvedDetail($stateParams, People){
      return People.one($stateParams.personId)
        .then( function ( response ){
          return response.data;
        })
    }

    /**
     * [resolvedList description]
     * @return {[type]}     [description]
     */
    function resolvedList(People){
      return People.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);