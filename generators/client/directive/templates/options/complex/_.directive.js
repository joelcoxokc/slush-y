;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .directive('<%= names.single.camel %>', <%= names.single.camel %>);

  /* @inject */
  function <%= names.single.camel %>() {
    return {
      templateUrl: '<%= directive_view_path %>'
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // <%= names.single.humanized %> directive logic
      // ...

    }
  }
}).call(this);
