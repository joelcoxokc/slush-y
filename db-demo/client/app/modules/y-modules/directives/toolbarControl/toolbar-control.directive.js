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
      if(attrs.size === 'tall'){
        $rootScope.toolbar.tall = true;
        $rootScope.toolbar.short = false;
      }
      if(attrs.size === 'short'){
        $rootScope.toolbar.short = true;
        $rootScope.toolbar.short = false;
      }
      if(attrs.type === 'paper'){
        $rootScope.toolbar.paper = true;
        $rootScope.toolbar.ink = false;
      }
      if(attrs.type === 'ink'){
        $rootScope.toolbar.ink = true;
        $rootScope.toolbar.paper = false;
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
