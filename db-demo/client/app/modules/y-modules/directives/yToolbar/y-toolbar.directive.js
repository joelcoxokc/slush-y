;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yToolbar', yToolbar);

  /* @inject */
  function yToolbar() {
    return {
      templateUrl: 'app/modules/y-modules/directives/yToolbar/y-toolbar.directive.view.html',
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // Y toolbar directive logic

      var body = angular.element( document.querySelector('body') );
      scope.$on('y:changed', function (next){

        if(next.name === 'home') {
          grow();
        } else {
          shrink();
        }


      });

      /**
       * grow description
       * @return {[type]} description
       */
      function grow (){
        element.addClass('y-tall');
        element.removeClass('y-medium');
        element.removeClass('y-short');
      }

      /**
       * shrink description
       * @return {[type]} description
       */
      function shrink (){
        element.addClass('y-short');
        element.removeClass('y-medium');
        element.removeClass('y-tall');
      }

      /**
       * toggle description
       * @return {[type]} description
       */
      function toggle (){}


    }
  }
}).call(this);
