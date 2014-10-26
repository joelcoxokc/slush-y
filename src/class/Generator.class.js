;(function(){

  'use strict';

    var _    = require('lodash'),
        path = require('path'),
        templator = require('../utility/templateGenerator');




    var Generator

    Generator = module.exports = function Generator (generator, options, __slushy) {
        var __this;

        __this            = this;
        options           = checkOptions();

        _.assign(__this, generator);

        __this.name       = generator.seq[0];
        __this.type       = getType();
        __this.path       = createPath();
        __this.default    = isDefault();
        __this.prompts    = fetchPrompts();
        __this.category   = options.category || 'default';
        __this.templator  = templator[__this.category]( __this.path, __this.name );

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
          return path.resolve( temp, generator.seq[0] );
        }

        /**
         * [getType Set the type of generator, used lator for filtering generator options]
         * @return {String} Client || angularModule || default
         */
        function getType () {
          if( options.category === 'client' && generator.seq[0] !== 'module') { return 'angular'; }
          if( generator.seq[0] === 'module' ){ return 'angularModule'; }
        }

        /**
         * [fetchPrompts       Using the already generated path. require the prompts from the generator's directory].
         *                     If __this.type === angular, then we need to read all the modules and and add them to the prompt choices.
         * @return {Object}    [Prompts for the gnerator];
         */
        function fetchPrompts () {
          var promptsPath = path.resolve( __this.path, 'prompts' );
          var prompts = require( promptsPath ).call(__slushy);

          if( __this.type === 'angular' ){
            prompts = __slushy.findModules( prompts, __slushy.__modulesDir );
          }
          return prompts
        }
    }


    Generator.prototype.createTemplates = function(option) {
      var __this = this;
      return __this.templator(option)
    };

}).call(this);