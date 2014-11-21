;(function(){

  'use strict';

  var _ = require('lodash');
  var Slushy = require('./Slushy');

  module.exports = function(gulpInst){


    gulpInst.Gulp.prototype.siphon = Slushy.siphon;
    gulpInst.Gulp.prototype.register = Slushy.register;
    gulpInst.Gulp.prototype.plugins = Slushy.plugins;
    gulpInst.Gulp.prototype.stream = Slushy.stream;
    gulpInst.Gulp.prototype.end = Slushy.end;
    gulpInst.Gulp.prototype.forward = Slushy.forward;

    return gulpInst
  }

}).call(this);