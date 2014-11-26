;(function(){
  'use strict';

  /**
   * point. add the point attribute to any element and the cursor will be a pointer on hover.
   */

  angular
    .module('core')
    .directive('point', point);

  /* @inject */
  function point() {
    return {
      template: '<div class="pointer" data-ng-transclude></div>',
      restrict: 'A',
      scope: true,
      transclude:true,
      link: postLink
    };

    //////////


    function postLink(scope, element, attrs) {
      // Point directive logic
      // ...

    }
  }
}).call(this);
