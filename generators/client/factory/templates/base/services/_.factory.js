;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.single.classed %>', <%= names.single.classed %>);

  /* @inject */
  function <%= names.single.classed %>(<%=providers%>) {

    // Define Public API
    var instance = {<% _.forEach( functions, function(func){ %>
      <%=func%>: <%=func%>,<% }) %>
    };

    return instance;

    // <%= names.single.humanized %> service logic
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