;(function(){
'use strict';
  angular
    .module('core')
    .config( main );

  /* @inject */
  function main($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/features');
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/core/views/home.view.html',
        abstract:true
      })
      .state('home.features', {
        url: '/features',
        templateUrl: 'app/core/views/features.view.html',
        controller: 'HomeCtrl as vm',
        resolve: {
          Resolved: Resolved
        }
      })
      .state('home.detail', {
        url: '/features/:id',
        templateUrl: 'app/core/views/detail.view.html',
        controller: 'FeatureCtrl as vm',
        resolve: {
          Resolved: ResolvedFeature
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
      function ResolvedFeature( Thing, $stateParams ){
        return Thing.one($stateParams.id)
          .then( function ( response ){
            return response.data;
          });
      }
  }
}).call(this);