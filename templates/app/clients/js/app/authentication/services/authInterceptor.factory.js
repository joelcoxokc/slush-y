;(function(){
'use strict';
angular
  .module('authentication')
  .factory('authInterceptor', authInterceptor);

  /* @inject */
  function authInterceptor($rootScope, $q, $storage, $location){
    return {
      request:request,
      responseError: responseError
    };
    // Add authorization token to headers
    function request(config) {
      config.headers = config.headers || {};
      if ($storage.get('user_token')) {
        config.headers.Authorization = 'Bearer ' + $storage.get('user_token');
      }
      return config;
    }

    // Intercept 401s and redirect you to login
    function responseError(response) {
      if(response.status === 401) {
        // remove any stale tokens
        $storage.clear('user_token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  }
}).call(this);