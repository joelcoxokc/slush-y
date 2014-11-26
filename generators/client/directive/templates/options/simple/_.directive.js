;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .directive('<%= names.camelized %>', <%= names.camelized %>);

  /* @inject */
  function <%= names.camelized %>(<%=providers%>) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: link
    };

    ////////////////////

    function link(scope, element, attrs) {
      // <%= names.humanized %> directive logic

      element.text('this is the <%= names.camelized %> directive');
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
