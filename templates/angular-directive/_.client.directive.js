;(function(){
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .directive('<%= camelizedName %>', <%= camelizedName %>);

  /* @inject */
  function <%= camelizedName %>() {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: postLink
    };

    //////////

    function postLink(scope, element, attrs) {
      // <%= humanizedName %> directive logic
      // ...

      element.text('this is the <%= camelizedName %> directive');
    }
  }
}).call(this);
