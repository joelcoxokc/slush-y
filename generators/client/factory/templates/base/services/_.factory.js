;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.classed %>', <%= names.classed %>);

  /* @inject */
  function <%= names.classed %>(<%=providers%>) {

    // Define Public API
    var instance = {<% _.forEach( functions, function(func){ %>
      <%=func%>: <%=func%>,<% }) %>
    };

    return instance;

    // <%= names.humanized %> service logic
    ////////////////////////////////
    <% _.forEach( functions, function(func){ %>
    /**
     * <%=func%> description
     * @return {[type]} description
     */
    function <%=func%> (){}
    <% }) %>

  }
}).call(this);