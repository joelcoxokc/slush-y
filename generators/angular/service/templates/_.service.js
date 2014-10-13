;(function(){
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .factory('<%= classifiedName %>', <%= classifiedName %>);

  /* @inject */
  function <%= classifiedName %>() {
    this._storage = {};

    // <%= humanizedName %> service logic
    // ...
    this.set = function(key, val) {
      return this._storage[key] = val;
    }
    this.get = function(key) {
      if (key){
        return this._storage[key];
      }
      return this._storage;
    }
    this.remove = function(key){
      if (key){
        var result = this._storage[key];
        delete this._storage[key];
        return result;
      }
      this._storage = {};
    }

  }
}).call(this);