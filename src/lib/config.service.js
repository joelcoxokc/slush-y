;(function(){

  'use strict';

  var _       = require('lodash');
  var Q       = require('Q');
  var _str    = require('underscore.string');
  var Storage = require('./storage.service');


  /**
   * Interact with Base.Config;
   */


  var Config            = module.exports;
      Config.get        = get;
      Config.set        = set;
      Config.store      = store;
      Config.initConfig = initConfig;


  //////////////////////////


  function get(key){
    var __this = this;
    if(!key){ return __this.__config.getAll(); }
    return __this.__config.get(key);
  }

  function set(key, value){
    var __this = this;
    __this.__config.set(key, value);
  }

  function store(options) {
    var __this = this;
    _(options).forEach(function (value, key){

      __this.__config.set(key, value);

    });
  }

  function initConfig( __options ){

    var __this       = this;
    var config       =   {};
    __this.__config  =  new Storage('.sl-y.json');

    config.appName   = __this.__appName;
    config.defaults  = __this.__defaults;

    if(__options.answers.appName){

      config.appName = __options.answers.appName;
      config.defaults.appName = __options.answers.appName;

    }

    __this.str(__options.answers.appName, 'app_names', config).value;

    __this.store(config);

    return __options;
  }



}).call(this);