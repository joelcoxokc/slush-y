;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .filter('<%= names.single.camel %>', <%= names.single.camel %>);

  /* @inject */
  function <%= names.single.camel %>() {
    return function(input) {
      // <%= names.single.humanized %> directive logic
      // ...

      return '<%= names.single.camel %> filter: ' + input;
    };
  }
}).call(this);