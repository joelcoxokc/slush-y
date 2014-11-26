;(function(){
'use strict';
  angular
    .module('authentication')
    .config( authenticationConfig );

  /* @inject */
  function authenticationConfig($locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

  }
}).call(this);