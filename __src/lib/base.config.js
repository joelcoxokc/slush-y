;(function(){

  'use strict';

  var _ = require('lodash');


  /**
   * Interact with Base.Config;
   */


  var Config        = module.exports;
      Config.get    = get;
      Config.set    = set;
      Config.store  = store;


  //////////////////////////


  function get(key){
    if(!key){ return this.config.getAll(); }
    return this.config.get(key);
  }

  function set(key, value){
    this.config.set(key, value);
  }

  function store(options) {
    var _this = this;
    _(options).forEach(function (value, key){

      _this.config.set(key, value);

    });
  }



}).call(this);