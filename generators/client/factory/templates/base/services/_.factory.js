;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.single.classed %>', <%= names.single.classed %>);

  /* @inject */
  function <%= names.single.classed %>() {

    // Define private variables here . . .

    // Define Public API
    var instance = {
      someMethod: someMethod
    };

    return instance;

    // <%= names.single.humanized %> service logic
    // ...
    function someMethod() {
      return true;
    }

  }
}).call(this);