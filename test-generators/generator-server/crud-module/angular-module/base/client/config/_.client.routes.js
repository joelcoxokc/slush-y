;(function(){
'use strict';

  //Setting up route
  angular
    .module('<%= slugifiedPluralName %>')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // <%= humanizedPluralName %> state routing
    $stateProvider
      .state('list<%= classifiedPluralName %>', {
        url: '/<%= slugifiedPluralName %>',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/list-<%= slugifiedPluralName %>.client.view.html',
        controller: '<%= classifiedPluralName %>Controller',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('create<%= classifiedSingularName %>', {
        url: '/<%= slugifiedPluralName %>/create',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/create-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>CreateController'
      })
      .state('view<%= classifiedSingularName %>', {
        url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/view-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>DetailController',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('edit<%= classifiedSingularName %>', {
        url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id/edit',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/edit-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>DetailController',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////
    function resolvedDetail($stateParams, <%= classifiedPluralName %>){<% if(restangular){ %>
      return <%= classifiedPluralName %>.one($stateParams.<%= camelizedSingularName %>Id).get()<% } %><% if(http){ %>
      return <%= classifiedPluralName %>.one($stateParams.<%= camelizedSingularName %>Id)<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        })
    }
    function resolvedList(<%= classifiedPluralName %>){<% if(restangular){ %>
      return <%= classifiedPluralName %>.getList()<% } %><% if(http){ %>
      return <%= classifiedPluralName %>.all()<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        })
    }
  }
}).call(this);