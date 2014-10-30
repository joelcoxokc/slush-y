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
      .state('generators', {
        url: '/generators',
        templateUrl: 'app/modules/generators/views/generators.view.html',
        controller: 'GeneratorsController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })

      .state('generators.detail', {
        url: '/:generatorId',
        templateUrl: 'app/modules/generators/views/generators.detail.view.html',
        controller: 'GeneratorsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })


    ////////////////
    function resolvedDetail($stateParams, Generator){
      return Generator.one($stateParams.generatorId)
        .then( function ( response ){
          return response.data;
        })
    }
    function resolvedList(Generator){
      return Generator.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);