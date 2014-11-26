;(function(){

  'use strict';

  var _ = require('lodash');
  var Slushy = require('./Generator');
  var Config     = require('gulp-config');
  var Storage    = require('gulp-storage');
  var Finder     = require('gulp-finder');

  module.exports = function(gulpInst){
    Config(gulpInst)
    Storage(gulpInst)
    Finder(gulpInst)


    gulpInst.on('task_start', function(){
      this.storage.create('config-y','config-y.json');

    })
    // gulpInst.Gulp.prototype.siphon   = Slushy.siphon;
    // gulpInst.Gulp.prototype.register = Slushy.register;
    // gulpInst.Gulp.prototype.plugins  = Slushy.plugins;
    // gulpInst.Gulp.prototype.stream   = Slushy.stream;
    // gulpInst.Gulp.prototype.end      = Slushy.end;
    // gulpInst.Gulp.prototype.forward  = Slushy.forward;

    return gulpInst
  }

}).call(this);