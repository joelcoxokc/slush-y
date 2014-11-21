;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.single.classed %>', <%= names.single.classed %>);

  /* @inject */
  function <%= names.single.classed %>() {
    this._storage = {};
    this.set      = set;
    this.get      = get;
    this.remove   = remove;

    // <%= names.single.humanized %> service logic

    /**
     * [set description]
     * @param {[type]} key [description]
     * @param {[type]} val [description]
     */
    function set(key, val) {
      return this._storage[key] = val;
    }

    /**
     * [get description]
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    function get(key) {
      if (key){
        return this._storage[key];
      }
      return this._storage;
    }

    /**
     * [remove description]
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    function remove(key){
      if (key){
        var result = this._storage[key];
        delete this._storage[key];
        return result;
      }
      this._storage = {};
    }

  }
}).call(this);