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
    function resolvedDetail($stateParams, Generator){<% if(restangular){ %>
      return Generator.one($stateParams.generatorId).get()<% } %><% if(http){ %>
      return Generator.one($stateParams.generatorId)<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        })
    }
    function resolvedList(Generator){<% if(restangular){ %>
      return Generator.getList()<% } %><% if(http){ %>
      return Generator.all()<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        })
    }
  }
}).call(this);