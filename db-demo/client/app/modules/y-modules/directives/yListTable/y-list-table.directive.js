;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yListTable', yListTable);

  /* @inject */
  function yListTable() {
    return {
      templateUrl: 'app/modules/y-modules/directives/yListTable/y-list-table.directive.view.html',
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // Y list table directive logic


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
