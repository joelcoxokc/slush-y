;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.single.classed %>Controller', <%= names.single.classed %>Controller);

  /* @inject */
  function <%= names.single.classed %>Controller(<%=providers%>) {
    // <%= names.single.humanized %> controller logic

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
