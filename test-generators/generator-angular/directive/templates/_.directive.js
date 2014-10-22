;(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .directive('<%= camelSingleName %>', <%= camelSingleName %>);

  /* @inject */
  function <%= camelSingleName %>() {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: postLink
    };

    //////////

    function postLink(scope, element, attrs) {
      // <%= humanizedSingleName %> directive logic
      // ...

      element.text('this is the <%= camelSingleName %> directive');
    }
  }
}).call(this);
