;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.classed %>Controller', <%= names.classed %>Controller);

  /* @inject */
  function <%= names.classed %>Controller(<%=providers%>) {
    // <%= names.humanized %> controller logic

    $scope.val = 0;
    <% _.forEach( functions, function(func){ %>
    $scope.<%=func%> = <%=func%>;<% }) %>

    //////////////////
    <% _.forEach(functions, function(func){ %>
    /*
     * <%= func %>      description
     * @return {[type]} description
     *
     */
    function <%= func %>() {}
    <% }) %>

  }
}).call(this);
