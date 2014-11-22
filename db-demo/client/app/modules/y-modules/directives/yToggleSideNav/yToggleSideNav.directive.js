;(function(){
  'use strict';

  angular
    .module('y-modules')
    .directive('yToggleSideNav', yToggleSideNav);

  /* @inject */
  function yToggleSideNav() {
    return {
      restrict: 'A',
      link: link
    };

    ////////////////////

    function link(scope, element, attrs) {
      // Y toggle side nav directive logic
      var doc = document.querySelector('body');
      var over = document.querySelector('.y-overlay');
      var overlay = angular.element(over);
      var body = angular.element(doc);

      // document.querySelector('')

      element.on('click', function (){
        processToggle();
      });

      overlay.on('click', function(){
        processToggle();
      })

      function processToggle(){
        if(body.hasClass('y-closed')){
          toggleOpen();
          overlay.show()
        } else {
          toggleClosed();
          overlay.hide()
        }
      }

      /**
       * actionOne description
       * @return {[type]} description
       */
      function toggleOpen(){
        body.addClass('y-open');
        body.removeClass('y-closed');
      }

      /**
       * actionTwo description
       * @return {[type]} description
       */
      function toggleClosed (){
        body.addClass('y-closed')
        body.removeClass('y-open')
      }

    }
  }
}).call(this);
