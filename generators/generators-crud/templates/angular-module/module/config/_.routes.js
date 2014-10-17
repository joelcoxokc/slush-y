;(function(){
'use strict';

  //Setting up route
  angular
    .module('articles')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('<%= slugifiedPluralName %>', {
        url: '/<%= slugifiedPluralName %>',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/<%= slugifiedPluralName %>.view.html',
        controller: '<%= classifiedPluralName %>Controller as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('<%= slugifiedPluralName %>-create', {
        url: '/<%= slugifiedPluralName %>/create',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/<%= slugifiedPluralName %>.create.view.html',
        controller: '<%= classifiedPluralName %>CreateController as vm'
      })
      .state('<%= slugifiedSingularName %>-detail', {
        url: '/<%= slugifiedSingularName %>/:<%= slugifiedSingularName %>Id',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/<%= slugifiedSingularName %>.detail.view.html',
        controller: '<%= classifiedPluralName %>Controller as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('article-edit', {
        url: '/<%= slugifiedSingularName %>/:<%= slugifiedSingularName %>Id/edit',
        templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/<%= slugifiedSingularName %>.edit.view.html',
        controller: '<%= classifiedPluralName %>DetailController as vm',
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