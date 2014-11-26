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
      function Resolved( Thing ){
        return Thing.all()
          .then( function ( response ){
            return response.data;
          });
      }
  }
}).call(this);