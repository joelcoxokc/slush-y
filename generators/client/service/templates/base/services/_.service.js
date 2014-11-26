;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.classed %>', <%= names.classed %>);

  /* @inject */
  function <%= names.classed %>(<%=providers%>) {

    this._storage = {};

    // <%= names.humanized %> service logic
    ////////////////////////////////
    <% _.forEach( functions, function(func){ %>
    /**
     * <%=func%> description
     * @return {[type]} description
     */
    this.<%=func%> = function(){}
    <% }) %>

  }
}).call(this);