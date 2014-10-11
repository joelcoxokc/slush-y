;(function(){
  'use strict';

  //Setting up route
  angular
    .module('<%= slugifiedModuleName %>')
    .config( Confniguration );

  /* @inject */
  function Confniguration($stateProvider) {
    // <%= humanizedModuleName %> state routing
    $stateProvider.
    state('<%= slugifiedName %>', {
      url: '/<%= slugifiedRoutePath %>',
      templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedName %>.client.view.html'
    });
  }
}).call(this);
