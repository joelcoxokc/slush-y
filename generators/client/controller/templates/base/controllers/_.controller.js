;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .controller('<%= names.single.classed %>Controller', <%= names.single.classed %>Controller);

  /* @inject */
  function <%= names.single.classed %>Controller($scope<% if(deps.length){  %>,<%= deps %><% } %>) {
    // <%= names.single.humanized %> controller logic


    $scope.val             = 0;
    $scope.one             = one;
    $scope.two             = two;
    $scope.three           = three;

    //////////////////

    /**
     * [one description]
     * @return {[type]} [description]
     */
    function one(){}

    /**
     * [two description]
     * @return {[type]} [description]
     */
    function two(){}

    /**
     * [three description]
     * @return {[type]} [description]
     */
    function three(){}

  }
}).call(this);
