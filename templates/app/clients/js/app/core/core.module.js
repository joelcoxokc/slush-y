;(function(){
  'use strict';

  angular
    .module('core', [])
    .constant('serverBaseUrl', 'http://localhost:9000')
    .constant('serverUrl', 'http://localhost:9000/api');

}).call(this);