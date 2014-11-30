(function(){
  'use strict';

  var ee      = require('event-emitter'),
      emitter = ee({}), listener,
      path    = require('path'),
      _str = require('../src/Utility/strings/index.js');


  module.exports = Generator;

  function Generator(name, options){

    var _this = this;

        _this.name          = name;
        _this.root          = options.root      || path.join(__dirname, '../', 'generators', name);
        _this.promptsFile   = options.prompts   || path.join(__dirname, '../', _this.root, 'prompts');
        _this.templatesDir  = options.templates || path.join(__dirname, '../', _this.root, 'templates');
        _this.func          = require(path.join(__dirname, '../',_this.root));

  }

  Generator.prototype.run = function(name, options){
    var _this = this;

    return function (done){
      this.storage.create('config-y','config-y.json');
      this.templates = this.finder(_this.templatesDir);

      this.cwd        = {};
      this.cwd.root   = process.cwd();
      this.cwd.app    = './client/app';
      this.cwd.server = './server';

      this.config   = this.storage.get();
      this.defaults = {};
      this.argv = this.util.env;

      this.fs = _this.fs();
      this.str = _str.str();

      _this.func.call(this, _this)
    }
  }
  Generator.prototype.fs = function(){
    return {
      rename: rename,
      replace: replace,
    };
    function rename ( name ) {
      return function (file){
        if (file.basename.indexOf('_') == 0) {
          file.basename = file.basename.replace('_', name);
        }
      };
    }
    function replace(){
      return function (file){
        if (file.basename.indexOf('__') == 0) {
          file.basename = '.' + file.basename.slice(2);
        }
      };
    }
  }


})()