;(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .filter('<%= camelSingleName %>', <%= camelSingleName %>);

  /* @inject */
  function <%= camelSingleName %>() {
    return function(input) {
      // <%= humanizedSingleName %> directive logic
      // ...

      return '<%= camelSingleName %> filter: ' + input;
    };
  }
}).call(this);