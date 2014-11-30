;(function(){
'use strict';
  angular
    .module('core')
    .config( main );

  /* @inject */
  function main($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/views/home.view.html',
        controller: 'HomeCtrl as vm',
        resolve: {
          Resolved: Resolved
        }
      });

      /*
          Resolved Functions
       */
      //////////////
      function Resolved( Thing ){<% if(restangular){ %>
        return Thing.getList()<%}%><% if(http){ %>
        return Thing.all()<%}%>
          .then( function ( response ){<% if(restangular){ %>
            return response;<%}%><% if(http){ %>
            return response.data;<%}%>
          });
      }
  }
}).call(this);