;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yList', yList);

  /* @inject */
  function yList() {
    return {
      template: '<div class="flex"><article class="y-list f-12 flex-verticle" ng-transclude></article></div>',
      restrict: 'EA',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // Y list directive logic
      var el = angular.element( element ).find('article')
      if(attrs.hover){
        el.addClass('hover');
      }

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
