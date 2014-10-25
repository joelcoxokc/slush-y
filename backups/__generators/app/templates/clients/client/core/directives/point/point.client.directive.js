;(function(){
  'use strict';

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

      // element.text('this is the point directive');
    }
  }
}).call(this);
