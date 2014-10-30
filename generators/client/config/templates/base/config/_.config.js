;(function(){
  'use strict';
  // <%= moduleNames.humanized %> module config
  angular
    .module('<%= moduleNames.slug %>')
    .config( Configuration );

  /* @inject */
  function Configuration() {
    // Config logic
    // ...
  }
}).call(this);