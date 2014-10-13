;(function(){
  'use strict';
  /**
   * Removes server error when user updates input
   */
  angular
    .module('core')
    .directive('mongooseError', mongooseError);

  /* @inject */
  function mongooseError() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          element.on('keydown', function() {
            return ngModel.$setValidity('mongoose', true);
          });
        }
      };
  }
}).call(this);