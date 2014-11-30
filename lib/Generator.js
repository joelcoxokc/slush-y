(function(){
  'use strict';

  var ee      = require('event-emitter'),
      emitter = ee({}), listener,
      path    = require('path'),
      _str = require('../src/Utility/strings/index.js'),
      argv = require('minimist')(process.argv.slice(2)),
      _    = require('lodash');

  module.exports = Generator;

  function Generator(name, options){

    var _this = this;

        _this.name          = name;
        _this.root          = options.root      || path.join(__dirname, '../', 'generators', name);
        _this.promptsFile   = options.prompts   || path.join(__dirname, '../', _this.root, 'prompts');
        _this.templatesDir  = options.templates || path.join(__dirname, '../', _this.root, 'templates');
        _this.func          = require(path.join(__dirname, '../',_this.root));
        _this.flags         = {};

  }

  Generator.prototype.run = function(name, options){
    var _this = this;

    return function (done){
      emitter.emit('starting:' + _this.name);
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
      this.flags = _this.flags;
      // emitter.emit('starting:'+_this.name)
      _this.func.call(this, _this)
    }
  }
  Generator.prototype.option = function(name, short, long, type){
    var _this = this;
    var shortName = short.split('-')[1]
    var longName = long.split('--')[1]
    emitter.on('starting:'+this.name, function(){
      // console.log(argv);
      var name = longName || name;
      var val = argv[shortName] || argv[longName] || argv[name];
      _this.parseArgs(name, val, type)

    })
    return _this;
  }
  Generator.prototype.parseArgs = function(name, val, type){
    var _this = this;
    var types ={
      string:string,
      String:string,
      array: array,
      Array:array,
      bool:bool,
      boolean:bool,
      Boolean:bool
    }
    types[type]();
    function string(){
      _this.flags[name] = val;
    }
    function array(){
      if(_.isString( val )){
        var items = val.split(',');
        _this.flags[name] = items;
      } else {
        _this.flags[name] = val;
      }
    }
    function bool(){
      if(val){
        if(val === false){
          _this.flags[name] = false;
        } else {
          _this.flags[name] = true;
        }
      }
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