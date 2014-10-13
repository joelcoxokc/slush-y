;(function(){
  'use strict';
  // <%= humanizedModuleName %> module config
  angular
    .module('<%= slugifiedModuleName %>')
    .config( Configuration );

  /* @inject */
  function Configuration() {
    // Config logic
    // ...
  }
}).call(this);