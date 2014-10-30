;(function(){

  'use strict';

    var _ = require('lodash');
    var util      = require('util');
    var Generator = require('../Generator');
    var Utility   = require('../Utility');
    var path      = require('path');
    var Promise  = require('bluebird');


    var Slushy;

    module.exports = new Slushy

    function Slushy () {

      Utility.apply(this, arguments);

      var _this = this;
      _this.rootDir         = path.join(__dirname+'', '../../');
      _this.modulesDir      = path.join('./client/app/modules');
      _this.coreDir         = path.join('./client/app/core');
      _this.appDir          = path.join('./client/app');
      _this.serverDir       = path.join('./server');
      _this.serverApi       = path.join('./server/api');
      _this.clientDir       = path.join('./client');
      _this.applicationRoot = path.join('./');
      // __this.__appName        = defaults.appName;
      // __this.__defaults       = defaults;


      // this.storage.create('config-y', 'config-y.json')

    }

    util.inherits(Slushy.prototype, Utility);

    Slushy.prototype.Name = function () {

        // _this.task()
    }

    Slushy.prototype.siphon = function(name, args) {
        var _this = this;
        _this.task(name, _this.register(args));
        return this;
    };


    Slushy.prototype.register = function(args){
        var _this = this;
        _this.storage.create('config-y', 'config-y.json');

        return function ( done ){

          var generator = new Generator(this, args, _this)

          return _this.stream( generator );

        }
    };

    Slushy.prototype.stream = function ( generator ){
      var _this = this;
      generator.run()
        .bind( _this )
        .bind( generator )
        .then( generator.configure )
        .then( generator.context )
        .then( generator.generate )
        .then( generator.runner )

    };

    Slushy.prototype.end = function () {
      var _this = this;
      return {
        myRoot : _this.rootDir,
        modules : _this.modulesDir,
        core : _this.coreDir,
        app : _this.appDir,
        server : _this.serverDir,
        api : _this.serverApi,
        client : _this.clientDir,
        root: _this.applicationRoot
      }
    }

    Slushy.prototype.plugins = function(){
      this.__plugins = arguments;
    }

}).call(this);