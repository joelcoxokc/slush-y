;(function(){
  'use strict';
  // <%= humanizedModuleName %> module config
  angular
    .module('<%= slugifiedModuleName %>')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Config logic
    // ...
  }
}).call(this);