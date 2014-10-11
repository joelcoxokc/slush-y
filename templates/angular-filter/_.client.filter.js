;(function(){
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .filter('<%= camelizedName %>', <%= camelizedName %>);

  /* @inject */
  function <%= camelizedName %>() {
    return function(input) {
      // <%= humanizedName %> directive logic
      // ...

      return '<%= camelizedName %> filter: ' + input;
    };
  }
}).call(this);