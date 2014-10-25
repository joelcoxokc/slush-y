;(function(){
  'use strict';
  //Setting up route
  angular
    .module('<%= slugifiedModuleName %>')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // <%= humanizedModuleName %> state routing
    $stateProvider
      .state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'app/modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.client.view.html'
      });
  }

}).call(this);