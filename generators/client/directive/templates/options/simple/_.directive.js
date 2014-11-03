;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .directive('<%= names.single.camel %>', <%= names.single.camel %>);

  /* @inject */
  function <%= names.single.camel %>(<%=providers%>) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: link
    };

    ////////////////////

    function link(scope, element, attrs) {
      // <%= names.single.humanized %> directive logic

      element.text('this is the <%= names.single.camel %> directive');
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
