;(function(){
  'use strict';

  angular
    .module('core')
    .directive('yIcon', yIcon);

  /* @inject */
  function yIcon() {
    return {
      template: '<i class="fa fa-{{icon}}"></i>',
      restrict: 'A',
      scope:true,
      link: postLink
    };

    //////////

    function postLink(scope, element, attrs) {
      scope.icon = attrs.yIcon;
      // Icon directive logic
      // ...

    }
  }
}).call(this);
