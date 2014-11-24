;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yListGroup', yListGroup);

  /* @inject */
  function yListGroup() {
    return {
      template: '<div class="y-list-group"><div ng-transclude></div></div>',
      restrict: 'EA',
      transclude:true,
      link: link
    };

    ////////////////////

    function link(scope, element, attrs) {
      // Y item directive logic
      // element.text('this is the yListGroup directive');
      /**
       * actionOne description
       * @return {[type]} description
       */
      function actionOne (){}

      /**
       * actionTwo description
       * @return {[type]} description
       */
      function actionTwo (){}

    }
  }
}).call(this);
