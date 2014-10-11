;(function(){
'use strict';
  angular
    .module('core')
    .config( main );

  /* @inject */
  function main($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/views/home.html'
        controller: 'HomeCtrl as vm'
      });
  }
}).call(this);