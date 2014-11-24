;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yFlex', yFlex);

  /* @inject */
  function yFlex() {
    return {
      template: '<div class="flex ng-transclude"></div>',
      restrict: 'EA',
      transclude:true,
      link: link
    };

    ////////////////////

    function link(scope, element, attrs) {
      // Y flex directive logic

      // element.text('this is the yFlex directive');

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
