;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .filter('<%= names.camelized %>', <%= names.camelized %>);

  /* @inject */
  function <%= names.camelized %>(<%=providers%>) {

    return filter;

    //////////////

    function filter(input) {
      // <%= names.humanized %> filter logic

      return '<%= names.camelized %> filter: ' + input;

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