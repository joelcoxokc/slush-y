;(function() {
'use strict';
  angular
    .module('core')
    .factory('logger', logger);
    function logger() {
      var logIt;
      toastr.options = {
        'closeButton': true,
        'positionClass': 'toast-bottom-right',
        'timeOut': '3000'
      };
      logIt = function(message, type) {
        return toastr[type](message);
      };
      return {
        log: function(message) {
          logIt(message, 'info');
        },
        logWarning: function(message) {
          logIt(message, 'warning');
        },
        logSuccess: function(message) {
          logIt(message, 'success');
        },
        logError: function(message) {
          logIt(message, 'error');
        }
      };
    }
}).call(this);

