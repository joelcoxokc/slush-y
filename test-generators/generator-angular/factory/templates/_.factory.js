;(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .factory('<%= classSingleName %>', <%= classSingleName %>);

  /* @inject */
  function <%= classSingleName %>() {

    // Define private variables here . . .

    // Define Public API
    var instance = {
      someMethod: someMethod
    };

    return instance;

    // <%= humanizedSingleName %> service logic
    // ...
    function someMethod() {
      return true;
    }

  }
}).call(this);