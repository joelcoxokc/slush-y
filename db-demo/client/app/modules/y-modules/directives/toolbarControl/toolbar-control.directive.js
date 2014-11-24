;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('toolbarControl', toolbarControl);

  /* @inject */
  function toolbarControl($rootScope) {
    return {
      // templateUrl: 'app/modules/--modules/directives/toolbarControl/toolbar-control.directive.view.html',
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // Toolbar control directive logic

      console.log($rootScope.toolbar)

      if(attrs.title){
        $rootScope.toolbar.title = attrs.title;
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
