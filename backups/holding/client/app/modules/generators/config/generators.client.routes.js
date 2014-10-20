;(function(){
'use strict';

  //Setting up route
  angular
    .module('generators')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Generators state routing
    $stateProvider
      .state('listGenerators', {
        url: '/generators',
        // templateUrl: 'app/modules/generators/views/list-generators.client.view.html',
        // controller: 'GeneratorsController as vm',
        // resolve: {
        //   resolvedList: resolvedList
        // }
      })
      .state('listGenerators.create', {
        url: '/create',
        templateUrl: 'app/modules/generators/views/create-generator.client.view.html',
        controller: 'GeneratorsCreateController as vm'
      })
      .state('listGenerators.detail', {
        url: '/:generatorId',
        // templateUrl: 'app/modules/generators/views/view-generator.client.view.html',
        // controller: 'GeneratorsDetailController as vm',
        // resolve: {
          // resolvedDetail: resolvedDetail
        // }
      })
      .state('listGenerators.edit', {
        url: '/:generatorId/edit',
        templateUrl: 'app/modules/generators/views/edit-generator.client.view.html',
        controller: 'GeneratorsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////
    function resolvedDetail($stateParams, Generators){
      return Generators.one($stateParams.generatorId).get()
        .then( function ( response ){
          return response;
        })
    }
    function resolvedList(Generators){
      return Generators.getList()
        .then( function ( response ){
          return response;
        })
    }
  }
}).call(this);