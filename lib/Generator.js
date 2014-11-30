(function(){
  'use strict';

  var ee      = require('event-emitter'),
      emitter = ee({}), listener,
      path    = require('path'),
      _str = require('../src/Utility/strings/index.js'),
      argv = require('minimist')(process.argv.slice(2)),
      chalk= require('chalk'),
      fs   = require('fs'),
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
        _this.cwd           = {};

  }

  Generator.prototype.run = function(name, options){
    var _this = this;
    _this.cwd.root   = process.cwd();
    _this.cwd.server = './server';
    _this.cwd.app = path.join(process.cwd(), 'client/app');
    _this.cwd.modules = path.join(this.cwd.app, 'modules');

    return function (done){
      _this.args = this.args;
      emitter.emit('starting:' + _this.name, done);
      this.storage.create('config-y','config-y.json');
      this.templates = this.finder(_this.templatesDir);

      this.cwd         = {};
      this.cwd.root    = _this.cwd.root;
      this.cwd.app     = _this.cwd.app;
      this.cwd.server  = _this.cwd.server;
      this.cwd.modules = _this.cwd.modules;

      this.config   = this.storage.get();
      this.defaults = {};
      this.argv = this.util.env;

      this.fs = _this.fs();
      this.str = _str.str();
      this.flags = _this.flags;
      // console.log(this.flags);
      if(_this.stop){
        return done();
      }
      _this.func.call(this, _this)
    }
  }
  Generator.prototype.option = function(name, short, long, type){
    var _this = this;
    var shortName = short.split('-')[1]
    var longName = long.split('--')[1]
    emitter.on('starting:'+this.name, function(){

      var name = longName || name;
      var val = argv[shortName] || argv[longName] || argv[name];
      _this.parseArgs(name, val, type);

    })
    return _this;
  }
  Generator.prototype.required = function(val){
    var _this = this;
    if(val === 'name'){
      emitter.on('starting:'+this.name, function (done){
        if(!_this.args[0]){
          _this.errors().name();
          _this.stop = true;
        }
      });
    }
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
      Bool:bool,
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
      if(name){
        if(val){
          _this.flags[name] = true;
        } else {
          _this.flags[name] = false;
        }
      }
      // if(val){
      //   if(val === false){
      //     _this.flags[name] = false;
      //   } else {
      //     _this.flags[name] = true;
      //   }
      // }
    }
  }
  Generator.prototype.errors = function(){
    var _this = this;
    var errors = {
      name: nameError
    };
    return errors;
    function nameError(){
      console.log(chalk.bold.red('**************************************************************************'));
      console.log(chalk.bold.red('******   '+chalk.bold.red('Incorrect usage of the sub-generator!!')));
      console.log(chalk.bold.red('******   '+chalk.bold.red('Try slush y:'+_this.name+' <'+_this.name+'-name>')));
      console.log(chalk.bold.red('******   '+chalk.bold.red('Ex: slush y:'+_this.name+' article')));
      console.log(chalk.bold.red('**************************************************************************'));
    }
  }
  Generator.prototype.fs = function(){
    var _this = this;
    return {
      rename: rename,
      replace: replace,
      findModules: findModules,
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
    function findModules(){
      var array = [{value:'core',name:'core'}];
      var dirs = fs.readdirSync(_this.cwd.modules);
      getModules()
      return array;
      function getModules(){
        _.forEach(dirs, function (folder){
          var stat = fs.statSync(_this.cwd.modules + '/' + folder);
          if (stat.isDirectory()) {
            array.push({
              value: folder,
              name: folder
            });
          }
        });
      }
    }
  }


})()