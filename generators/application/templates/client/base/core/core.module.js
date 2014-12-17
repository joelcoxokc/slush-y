;(function(){
  'use strict';

  angular
    .module('core', [])
    .constant('serverBaseUrl', 'http://' + window.location.host)
    .constant('serverUrl', 'http://' + window.location.host +'/api');

}).call(this);
