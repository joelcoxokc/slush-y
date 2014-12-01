(function(){
/*
   * Store
   * https://github.com//testing-demo
   *
   * Copyright (c) 2014
   * Licensed under the MIT license.
   */

  'use strict';


  var Store = module.exports = function (done) {
    var store = {};
    var _this = this;

    var config = {}
        config.module = _this.argv.m || _this.argv.module;

    if(!config.module){
      console.log('please specify a modeule');
      console.log('slush lib:save <name> -m <module-name> or --module <module-name>');
      return done()
    }



    /**
     * [filter description]
     * @param  {[type]}   params   [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function filter ( params, cb ){

    }
    /**
     * [configure description]
     * @param  {[type]}   params   [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function configure ( params, cb ){

    }

    /**
     * [save description]
     * @param  {[type]}   params   [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    store.save = function( params, callback ){
      _this.name = [0];
    };
    /**
     * [update description]
     * @param  {[type]}   params   [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    store.update = function( params, callback ){

    };

    return store;
  };


})();






