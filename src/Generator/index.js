;(function(){

  'use strict';

  var _ = require('lodash');
  var path = require('path');
  var inflect   = require('inflection');
  var _s      = require('underscore.string');
  var gulp    = require('gulp');
  var Q       = require('q');
  var Promise = require('bluebird');

  var Generator;

  Generator = module.exports = Generator;

  function Generator (task, args, slushy) {

    var _this = this;
    initialize();


    _this.default = _this.isDefault();
    _this.validate();

    _this.name      = this.seq[0];
    _this.title     = this.args[0] || 'application';
    _this.type      = args.type;
    _this.done      = args.done
    _this.path      = _this.getPath();
    _this.flags     = _this.getFlags();
    _this.storage   = slushy.storage
    _this.config    = _this.resolve( 'config' );
    _this.prompts   = _this.resolve( 'prompts' );
    _this.tempPath  = _this.find( 'templates' );
    _this.templates = slushy.finder( _this.tempPath );

    // return _this;

    /**
     * [initialize hoist all the costructor functions to the top, so we can organize our defaults]
     */
    function initialize() {
      _.assign(_this, task);

      _this.find      = find;
      _this.runner    = runner;
      _this.filters   = filters;
      _this.getPath   = getPath;
      _this.resolve   = resolve;
      _this.getFlags  = getFlags;
      _this.validate  = validate;
      _this.isDefault = isDefault;
    }

    /**
     * [run the required file to run the generator]
     * @return {Function} [the actual generator function]
     */
    function runner() {
      return resolve()
    }

    /**
     * [filters initialize the filters for template usage]
     * @return {Object} [return an object containing all the filters]
     */
    function filters() {
      _this.names  = slushy.str().simple( _this.name );
      _this.titles = slushy.str().multi(_this.title);
    }

    /**
     * [isDefault check is the current generator is default]
     * @return {Boolean} [return true if this is the default generator]
     */
    function isDefault() {
      if(task.seq[0] === 'default') return true;
      return false;
    }

    /**
     * [validate validate that the user passed a name argument as the first arg]
     */
    function validate() {

      if( _this.default ) return;

      if( !_this.args[0] ) {
        console.log('Error Name must be specified');
        return args.done();
      }
    }

    /**
     * [getPath is this is not the default directory, the generator
     *                  should exist under the ./generators directory
     *                  The generator should exist in a folder
     *                  by the name of the type you gave it
     * @return {String} [return a normalized path]
     */
    function getPath() {
      var dir = __dirname +'';
      var name = _this.name;
      if(name === 'default') name = 'application';
      return path.join( dir, '../../generators', name );
    }

    /**
     * [getFlags parses the command line flags for use later]
     * @return {Object} [an object containing all the flags]
     */
    function getFlags() {
      var flags = {};
      var f   = _this.util.env.f;
      var m   = _this.util.env.m;
      var p   = _this.util.env.p;
      flags.providers = _this.util.env.functions || f || [];
      flags.module    = _this.util.env.module    || m || 'no-name';
      flags.providers = _this.util.env.module    || p || [];
      return flags;
    }

    /**
     * [resolve get the resolved realtive path to the generator]
     * @param  {String} dir [the realative dir to find from the generator]
     * @return {String}     [the relative dir from the root to the desired directory]
     */
    function resolve(dir) {
      dir = dir || '';
      return require( _this.find( dir ) );
    }

    /**
     * [find Similar to resolve, however, it only it does not require the module... just returns the path]
     * @param  {String} dir [the realative dir to find from the generator]
     * @return {String}     [the relative dir from the root to the desired directory]
     */
    function find(dir) {
      dir = dir || '';
      return path.resolve( _this.path, dir );
    }
  }

  Generator.prototype.run = function(slushy, resolve, thing){
    var _this = this;


    return new Promise(function (done, fail){
      console.log(done);
      _this.prompt(function (answers){
        done(answers)
      })

    })

  };

  Generator.prototype.prompt = function (done) {
    var _this = this;

    return _this.prompts.call(_this, done);
  };

  Generator.prototype.configure = function(answers){
    // this.storage.set('answers', answers);/
    this.config(answers)
    return answers
  }

  Generator.prototype.context = function(answers) {
    var _this = this;
    var args = Array.prototype.slice.call(_this.__plugins);
    args.unshift(gulp, answers);
    return args
  };

  Generator.prototype.generate = function( args ) {
    return this.runner().apply(this, args);
  };

}).call(this);









