;(function(){
  'use strict';
  //Setting up route
  angular
    .module('<%= slugifiedModuleName %>')
    .config( Configuration );
  function Configuration($stateProvider) {
    // <%= humanizedModuleName %> state routing
    $stateProvider.
      state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.client.view.html'
      });
  }

}).call(this);