;(function(){

  'use strict';

    var _    = require('lodash'),
        path = require('path'),
        util = require('./util'),
        inflect   = require('inflection'),
        templator = require('./util/templates'),
        builder   = require('./util/builder'),
        defaultPrompts = require('./util/prompts'),
        Q = require('q');

    var Generator;

    Generator = module.exports = Generator

    function Generator (generator, options, __slushy) {
        var __this;

        __this            = this;
        options           = checkOptions();
        _.assign(__this, generator);


        __this.name       = generator.seq[0];
        __this.type       = getType();
        __this.path       = createPath();
        __this.title      = createTitle();
        __this.default    = isDefault();
        __this.promptRunner= getPromptRunner();
        __this.category   = options.category || 'default';
        __this.component  = fetchComponentName();
        __this.flags      = generator.util.env;
        __this.filters    = generateFilters();
        __this.prompts    = fetchDefaultPrompts();
        // __this.templator  = templator[__this.category]( __this.path, __this.name );
        __this.templates  = builder.buildTemplates( __this.path +'/templates' );


        //////////////////////////////////

        /**
         * [checkOptions validate that the options param is not a string]
         * @return {Object}         [if the options param is a string, return an object with the sting set as the category property ]
         */
        function checkOptions () {
          var temp = {};
          if( _.isString(options) ){ temp.category = options; return temp; }
          return options;
        }

        /**
         * isDefault validate wether the current generator is the default or not.
         * @param  {String}  name [the name of the current running generator]
         * @return {Boolean}      [return true is the name is default, else return false]
         */
        function isDefault ( name ) {
          if( generator.seq[0] === 'default' ) { return true; }
          return false;
        }

        /**
         * [createPath Create the actual path to the generator, this will define the templates path and the prompts path]
         * @return {String} [URI to he generator];
         */
        function createPath () {
          var temp = __slushy.__generatorsPath;
          if ( options.category ){ temp = path.join( __slushy.__generatorsPath, options.category ); }
          if( options.category === 'server' ){
            return path.resolve( temp, generator.seq[0].split('-')[1] );
          }
          return path.resolve( temp, generator.seq[0] );
        }

        /**
         * createDest create the destinatino route based on the current generators component and moduleName
         * @return {[type]} [description]
         */
        function createTitle () {
          if ( generator.args[0] ){ return generator.args[0]; }
          return false;
        }

        /**
         * [getType Set the type of generator, used lator for filtering generator options]
         * @return {String} Client || angularModule || default
         */
        function getType () {
          if( options.category === 'client' && generator.seq[0] !== 'module') { return 'angular'; }
          if( generator.seq[0] === 'module' ){ return 'angularModule'; }
          if( generator.name === 'crud' ){ return 'crud'; }
          if( options.category === 'server'){
            return 'server';
          }
        }

        /**
         * [fetchPrompts       Using the already generated path. require the prompts from the generator's directory].
         *                     If __this.type === angular, then we need to read all the modules and and add them to the prompt choices.
         * @return {Object}    [Prompts for the gnerator];
         */
        function getPromptRunner () {
          var promptsPath = path.resolve( __this.path, 'prompts' );
          var prompts = require( promptsPath );
          return prompts
        }

        function fetchDefaultPrompts(){
          var prompts = [];
          _.forEach( __this.filters , function (val, key){
            if(_.isEmpty( val )){
              console.log(key + ' is empty');
              prompts.push( defaultPrompts(key) );
            }
          });
          if(prompts.length && prompts[0].name === 'module'){
            prompts = util.findModules(prompts);
          }
          return prompts;
        }


        /**
         * [fetchComponentName Retrieve the first argument passed to the generator... this is considered the name arg]
         *                     Set the __this.component === the name arg;
         * @return {String}    generator.args[0] or false
         */
        function fetchComponentName () {
          if( __this.type === 'angular' && generator.args[0] ){

            if( __this.name !== 'api' || __this.name !== 'config' ){
              return inflect.pluralize( __this.name );
            }
            return __this.name;

          } else { return false; }
        }

        function generateFilters() {
          var filters = {};
          filters.module    = __this.flags.module    || __this.flags.m || null;
          filters.providers = __this.flags.providers || __this.flags.p || [];
          filters.functions = __this.flags.functions || __this.flags.f || [];
          _.forEach(filters, function (val, key){

            if(_.isString( filters[key]) ){
              filters[key] = val.split(',');
            }

          })
          console.log(filters);
          return filters;
        }
    }

    _.extend(Generator.prototype, require('./util/flags'));

    Generator.prototype.prompt = function(callback){
      var __this = this;
      // var q = Q.defer();
      __this.promptRunner.call(this, function ( answers ){
        var filtered = [];
        _.forEach(answers, function (val, key){
          if(_.isEmpty(val)) return filtered[key] = [];
          filtered[key] = val;
        });
        _.assign(__this.filters, filtered);
        callback(filtered);
      })
      // return q.promise;
    }

}).call(this);