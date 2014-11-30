;(function(){
'use strict';

  //Setting up route
  angular
    .module('<%= moduleNames.slug %>')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('<%= names.plural.camel %>', {
        url: '/<%= names.plural.camel %>',
        templateUrl: 'app/modules/<%= names.plural.camel %>/views/<%= names.plural.camel %>.view.html',
        controller: '<%= names.plural.classed %>Controller as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('<%= names.plural.camel %>-create', {
        url: '/<%= names.plural.camel %>/create',
        templateUrl: 'app/modules/<%= names.plural.camel %>/views/<%= names.plural.camel %>.create.view.html',
        controller: '<%= names.plural.classed %>CreateController as vm'
      })
      .state('<%= names.plural.slug %>-detail', {
        url: '/<%= names.single.slug %>/:<%= names.single.slug %>Id',
        templateUrl: 'app/modules/<%= names.plural.camel %>/views/<%= names.plural.slug %>.detail.view.html',
        controller: '<%= names.plural.classed %>DetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('<%= names.plural.slug %>-edit', {
        url: '/<%= names.single.slug %>/:<%= names.single.slug %>Id/edit',
        templateUrl: 'app/modules/<%= names.plural.camel %>/views/<%= names.plural.slug %>.edit.view.html',
        controller: '<%= names.plural.classed %>DetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////

    /**
     * [resolvedDetail description]
     * @return {[type]}    [description]
     */
    function resolvedDetail($stateParams, <%= names.plural.classed %>){<% if(restangular){ %>
      return <%= names.plural.classed %>.one($stateParams.<%= names.single.camel %>Id).get()<% } %><% if(http){ %>
      return <%= names.plural.classed %>.one($stateParams.<%= names.single.camel %>Id)<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        });
    }

    /**
     * [resolvedList description]
     * @return {[type]}     [description]
     */
    function resolvedList(<%= names.plural.classed %>){<% if(restangular){ %>
      return <%= names.plural.classed %>.getList()<% } %><% if(http){ %>
      return <%= names.plural.classed %>.all()<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        });
    }
  }
}).call(this);