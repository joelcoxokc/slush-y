;(function(){
  'use strict';
  // <%= humanizedModuleName %> module config
  angular
    .module('<%= moduleName %>')
    .config( Configuration );

  /* @inject */
  function Configuration() {
    // Config logic
    // ...
  }
}).call(this);