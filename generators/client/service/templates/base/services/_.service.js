;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.single.classed %>', <%= names.single.classed %>);

  /* @inject */
  function <%= names.single.classed %>(<%=providers%>) {

    this._storage = {};

    // <%= names.single.humanized %> service logic
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