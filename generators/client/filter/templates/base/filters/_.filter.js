;(function(){
  'use strict';

  angular
    .module('<%= names.slug %>')
    .filter('<%= names.single.camel %>', <%= names.single.camel %>);

  /* @inject */
  function <%= names.single.camel %>(<%=providers%>) {

    return filter;

    //////////////

    function filter(input) {
      // <%= names.single.humanized %> filter logic

      return '<%= names.single.camel %> filter: ' + input;

      ////////////////////////////////
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