;(function(){
    'use strict';

    var Slush_y   = require('./src/class/Slush_y.class.js');
    var _         = require('lodash');
    var inquirer  = require('inquirer');
    var Q         = require('q');
    var plugins   = require('gulp-load-plugins')({lazy: false});
    var Generator = require('./src/class/Generator.class');

    var slush_y = new Slush_y;
    var Siphon = module.exports = (function() {

      'use strict';

        var __this = this;
        var __stream = {
          configuration: configuration,
          defaults:      defaults,
          validate:      validate,
          register:      register,
          prompts:       prompts,
          siphon:        siphon,
          filter:        filter,
          source:        source,
          paths:         paths,
          flow:          flow,
          use:           use
        };

        return __stream;

        ////////////////////////

        function siphon(args, __Generator){
          var __Generator = __Generator || function(){};
          // var generator = new
          var options = options || {};
          options.category = args || null;


          return function (done){
            /**
             * Set options.generator equal to the context of the current gulp taks;
             * @type {Object};
             */

            options.generator = new Generator( this, options, __this );
            options.doneCallback = done;
            // console.log(options.generator.createTemplates('http'));

            return __stream.validate( options )

                .then( __stream.flow          )
                .then( __stream.defaults      )
                .then( __stream.prompts       )
                .then( __stream.configuration )
                .then( __stream.filter        )
                .then( __stream.paths         )
                .then( __stream.source        )
                .then( __stream.use           )
                .catch( done )
          }
        }
        function use ( options ) {

          // Calls Slush_y.use( options )
          return options.__Generator(plugins, options.paths, options.filters, options.templates, options);
        }

        function validate ( options ) {
          var $promised = Q.defer();
          $promised.resolve( __this.validate(options) );
          return $promised.promise;

        }

        function flow ( options ) {
          // __this.log(options)
          // console.log('flow =====', options);
          // Calls Slush_y.flow( options ); and promises it's return value;
          return __this.flow( options )
        }

        function defaults (options) {
          // console.log('defaults====', options)

          // Calls Slush_y.defaults( options );
          return __this.defaults( options );
        }
        function prompts ( options ) {

          // Calls Slush_y.prompts( options )
          return __this.prompts( options );
        }
        function configuration ( options ) {

          // if(default) Slush_y.initConfig( options ) else Slush_y.setConfig( options )
          return __this.configuration( options );
        }
        function filter( options ) {
          // Calls Slush_y.filter to generator filters for templates.
          return __this.filter( options );
        }
        function paths ( options ) {
          // Calls slush_y.paths to generate paths for templating.
          return __this.paths( options );
        }
        function source( options ) {

          // Calls Slush_y.use( options )
          return __this.source( options );
        }
        function register(){

          return __this.register(__dirname);
        }

    }).call(slush_y);


}).call(this);

