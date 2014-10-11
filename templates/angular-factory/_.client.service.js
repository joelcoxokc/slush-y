;(function(){
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .factory('<%= classifiedName %>', <%= classifiedName %>);

  /* @inject */
  function <%= classifiedName %>() {

    // Define private variables here . . .

    // Define Public API
    var instance = {
      someMethod: someMethod
    };

    return instance;

    // <%= humanizedName %> service logic
    // ...
    function someMethod() {
      return true;
    }

  }
}).call(this);