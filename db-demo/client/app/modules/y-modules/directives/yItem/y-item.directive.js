;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yItem', yItem);

  /* @inject */
  function yItem() {
    return {
      template: '<div class="y-item" point><div ng-transclude></div></div>',
      restrict: 'EA',
      transclude:true,
      link: link
    };

    ////////////////////

    function link(scope, element, attrs) {
      // Y item directive logic
      // element.text('this is the yItem directive');
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
