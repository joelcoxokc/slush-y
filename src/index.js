;(function(){

  'use strict';

  var _ = require('lodash');
  var Slushy = require('./Slushy');
  var parseArgs = require('minimist');
  var argv = parseArgs(process.argv.slice(2));
  module.exports = function(gulpInst){

    gulpInst.Gulp.prototype.siphon = Slushy.siphon;
    gulpInst.Gulp.prototype.register = Slushy.register;
    gulpInst.Gulp.prototype.plugins = Slushy.plugins;
    gulpInst.Gulp.prototype.stream = Slushy.stream;
    gulpInst.Gulp.prototype.end = Slushy.end;
    gulpInst.Gulp.prototype.forward = Slushy.forward;
    gulpInst.Gulp.prototype.argv = parseArgs(process.argv);

    return gulpInst
  }

}).call(this);