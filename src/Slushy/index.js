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
        .then(function ( data ){
          console.log('Tail End Done');
          return data;
        })
    };


    Slushy.prototype.plugins = function(){
      this.__plugins = arguments;
    }

}).call(this);