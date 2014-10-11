;(function(){
'use strict';
  angular
    .module('authentication')<% if(restangular){ %>
    .factory( 'authRestangular', authRestangular )<% } %>
    .config( authenticationConfig );

  /* @inject */
  function authenticationConfig($locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

  }<% if(restangular){ %>
  /* @inject */
  function authRestangular(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:9000/api');
    });
  }<% } %>
}).call(this);