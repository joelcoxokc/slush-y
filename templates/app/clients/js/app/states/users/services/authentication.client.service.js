;(function(){
'use strict';

// Authentication service for user variables
  angular
    .module('users')
    .factory('Authentication', Authentication);

  /* @inject */
  function Authentication() {
    var _this = this;

    _this._data = {
      user: window.user
    };

    return _this._data;
  }
}).call(this);