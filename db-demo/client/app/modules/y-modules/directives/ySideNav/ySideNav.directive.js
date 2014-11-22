;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('ySideNav', ySideNav);

  /* @inject */
  function ySideNav() {
    return {
      templateUrl: 'app/modules/y-modules/directives/ySideNav/ySideNav.directive.view.html',
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // Sidenav directive logic
      console.log('yolo');

      /**
       * open description
       * @return {[type]} description
       */
      function open (){}

      /**
       * close description
       * @return {[type]} description
       */
      function close (){}


    }
  }
}).call(this);
