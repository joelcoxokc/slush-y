(function(){
  'use strict';

  var ee      = require('event-emitter'),
      emitter = ee({}), listener,
      Generator = require('./Generator'),
      gulp      = require('gulp'),
      path      = require('path');

  module.exports = new Api;

  function Api(){

    var _this = this;

        _this.generators = {};


    emitter.on('new:generator', function (name){
      gulp.task(name, _this.generators[name].run() );
    });
  }

  Api.prototype.start = function(name, options){
    this.generators[name] = new Generator(name, options);
    emitter.emit('new:generator', name);

  }


})()