;(function(){

  'use strict';

    var _        = require('lodash');
    var util     = require('util');
    var path     = require('path');
    var Utility  = require('./Utility.class');
    var Storage  = require('../lib/storage.service');
    var defaults  = require('../lib/defaults.service');
    var Q        = require('Q');


    module.exports = Base;

    function Base (param) {

        Utility.apply(this, arguments);

        var __this = this;

        __this.__config   =  new Storage('.sl-y.json');
        __this.__rootDir  =  path.join(__dirname+'', '../../');
        __this.generators = {};
        __this.desfaults  =  defaults;
        __this.__clientDir     = path.join('./client');
        __this.__serverDir     = path.join('./server');
        __this.__appDir        = path.join('./client/app');
        __this.__coreDir       = path.join('./client/app/core');
        __this.__modulesDir    = path.join('./client/app/modules');
        __this.__appName       = 'Slush-y';

        __this.__config.set('__rootDir',    __this.__rootDir);
        __this.__config.set('__serverDir',  __this.__serverDir);
        __this.__config.set('__clientDir',  __this.__clientDir);
        __this.__config.set('__modulesDir', __this.__modulesDir);
        __this.__config.set('__coreDir',    __this.__coreDir);
        __this.__config.set('__appDir',     __this.__appDir);
        __this.__config.set('__appName',    __this.__appName);
        __this.__config.set('appName',      __this.__appName);

        __this.__config.set(defaults)

        // console.log(this)
        __this.normalize = function(dest){
          return path.join(this.__rootDir, dest);
        }

    }

    util.inherits(Base, Utility);

    _.extend(Base.prototype, require('../controllers/Base.controller').controller);
    _.extend(Base.prototype, require('../lib/Base.config'));

    Base.prototype.promise = function(param1, param2){
        var $promised = Q.defer()
        $promised.resolve(param1, param2);
        return $promised.promise;
    };

    Base.prototype.register = function(root) {
        var __this = this;

        __this.__rootDir = root;
        __this.set('__rootDir', root);

        return {
          Plugins:    registerPlugins,
          Generators: registerGenerators
        }

       function registerGenerators(generators){

            var root = __this.get('');
          _(generators).forEach(function (path, key){
            __this.generators[key] = __this.normalize(path);//============ Resolve the normalized path

            __this.log('Registering ['+__this._blue('sub-generator')+']:' + __this._blue( key ));

            require( __this.normalize(path) ).apply(__this, __this.plugins);
          })
        }

        function registerPlugins(plugins){
          __this.plugins = arguments;
          // console.log(_.functions(this))
        }
    };

    Base.prototype.initialize = function(__gulp_stream, __slushy_stream){
        var __this = this;

        // console.log('initializeing', __gulp_stream);
        /**
         * Grab the current running generator and set it on the options object;
         *
         */
        __slushy_stream.generator = {};
        var generator = __this.isRunning(__gulp_stream.tasks)
        generator.path = __this.generators[generator.name];
        var options = {ref: 'name', name: __gulp_stream.args[0], generator:generator};

        _.assign(__slushy_stream.generator, options);

        return __this.promise(__slushy_stream);
    };

    Base.prototype.run = function(callback){
        var __this = this;

        /**
         * Gulp Callback    [Gulp Will invoke this function, passing a done method]
         *                  [Here were are exposing the gulp endpoint so we can in turn]
         *                  [Bind the context of (this) to the Callback]
         * @param  {[Function]} done [Gulp method to let Gulp know we are done building]
         * @return {[Function]}      [Gulp Callback]
         */
        return function (done){
          var __gulpInst = this;
          /*
           * (This) is referes to the instanc of gulp.
           */

           var __slushy_stream = {};

          __this.initialize(__gulpInst)
            .then(function (options){

              /**
               * Grab the current running generator and set it on the options object;
               *
               */
            })

          var generator = __this.isRunning(__gulpInst.tasks)
          generator.path = __this.generators[generator.name];
          var options = {ref: 'name', name: this.args[0], generator:generator};
          /**
           * Run the callback, binding this to it's context,
           * Also pass the configured options parameter.
           */
          callback.apply(__this, [done, options]);

        }
    };

    Base.prototype.generate = function(callback){
        var __this = this;

        /**
         * Callback function called on the last promise form the gulp endpiont
         * @param  {options} options [The modified options object]
         * @return {[functions]}     [Callback called form a promise]
         */
        return function (options){
          options = __this.exposePaths(options)

            // console.log(options)
          callback.apply($, [options]);
        }

    };


    Base.prototype.exposePaths = function(__slushy_stream){
        console.log('Exposing Paths for Generator');
        var str =''
        var __this = this;
        __slushy_stream.templates   = __slushy_stream.generator.generator.path+'templates';


        return __this.generatePaths(__slushy_stream);

    };

    Base.prototype.generatePaths = function(__slushy_stream){
        var __this = this;
        var taskName    = __slushy_stream.generator.name;
        var modulesDir  = __this.get('__modulesDir');
        var rootPath    = process.cwd();
        var appDir      = __this.get('__appDir')
        var correctPath = modulesDir;
        if(__slushy_stream === 'core'){ correctPath = appDir;}

        __slushy_stream.src  = source;
        __slushy_stream.dest = dest;

        // console.log(__slushy_stream);
        return __slushy_stream;

        //////////////////

        function source(){
          var instance = {
              any: any,
              views:views,
              styles:styles,
              scripts:scripts}
          if(__slushy_stream.generator.generator.name === 'default'){
            instance.app = application
          }
          return instance
        }

        function application(){
          return {
            statics: statics,
            server: server,
            client:client,
            httpType:httpType
          }
        }
        function statics(){
          return [__slushy_stream.templates, '/static','/**/*'].join('');
        }
        function server(){
          return [__slushy_stream.templates, '/servers','/**/*'].join('');
        }
        function client(){
          return [__slushy_stream.templates, '/clients/client', '/**/*'].join('');
        }
        function httpType(){
          return [
                  __slushy_stream.templates,
                  '/clients/options/',
                  __slushy_stream.application.httpType,
                  '/**/*'].join('');
        }
        function any(){
          return [taskName, 'templates', '/', '**/*'].join('');
        }
        function scripts(pattern){
          var pattern = pattern || '**/*.js'
          return [taskName, 'templates', '/', pattern].join('');
        }
        function views(patter){
          var pattern = pattern || '**/*.html'
          return [taskName, 'templates', '/', pattern].join('');
        }
        function styles(patter){
          var pattern = pattern || '**/*.css'
          return [taskName, 'templates', '/', pattern].join('');
        }
        function dest(){
          return {
            root: root,
            core:     core,
            final:    final,
            modules:  modules
          }
        }
        function root(){
          return ['rootPath']
        }
        function final(name){
          if(!name) {__this.error('You need to pass the last path into the dest().final( <here> )')}
          return [rootPath, '/', correctPath,'/', options.moduleName, '/', name].join('');
        }
        function modules(module, pattern){
          var pattern = pattern || null;
          var module = module || null;
          var arrayPath = [rootPath, '/', modulesDir, '/'];
          if(module){ arrayPath.push(module); arrayPath.push('/'); }
          if(pattern){ arrayPath.push(pattern); }
          // arrayPath.push(pattern);
          return arrayPath.join('');
        }
        function core(pattern){
          var pattern = pattern || '**/*';
          var arrayPath = [rootPath, '/', appDir, '/core/'];
          arrayPath.push(pattern);
          return arrayPath;
        }
    };


    Base.prototype.processFile  = function (bool, file, options){
        if(!bool){
          if (file.basename.indexOf('__') == 0) {
            file.basename = '.' + file.basename.slice(2);
          }
        } else {
          if (file.basename.indexOf('_') == 0) {
            file.basename = file.basename.replace('_', options.slugName);
          }
        }
        return file;
    };
}).call(this);