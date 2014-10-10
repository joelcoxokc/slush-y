;(function(){
'use strict';
  angular
    .module('yoSoaApp')
    .config( main );

  /* @inject */
  function main($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/states/main/main.html',
        controller: 'MainCtrl as vm'
      });
  }
}).call(this);