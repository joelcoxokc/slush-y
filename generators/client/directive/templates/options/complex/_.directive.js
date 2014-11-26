;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .directive('<%= names.camelized %>', <%= names.camelized %>);

  /* @inject */
  function <%= names.camelized %>(<%=providers%>) {
    return {
      templateUrl: '<%= directive_view_path %>'
      restrict: 'E',
      scope: true,
      transclude: true,
      link: link
    };

    ////////////////

    function link(scope, element, attrs) {
      // <%= names.humanized %> directive logic

      <% _.forEach( functions, function(func){ %>
      /**
       * <%=func%> description
       * @return {[type]} description
       */
      function <%=func%> (){}
      <% }) %>

    }
  }
}).call(this);
