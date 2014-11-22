;(function(){
  'use strict';
  //Setting up route
  angular
    .module('people')
    .config( Person );

  /* @inject */
  function Person($stateProvider) {
    // people state routing
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/modules/people/views/people.view.html'
      });
  }

}).call(this);