;(function(){
    'use strict';

    var Slushy   = require('./slushy.interface.js');
    var _         = require('lodash');
    var inquirer  = require('inquirer');
    var Q         = require('q');
    var plugins   = require('gulp-load-plugins')({lazy: false});
    var gulp      = require('gulp')
    var Generator = require('./Generator');

    var slush_y = new Slushy;
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
          paths:         paths,
          flow:          flow,
          use:           use
        };

        return __stream;

        ////////////////////////

        function siphon(args, __Generator){


          var options = __this.createOptions();
          options.category = args || null;


          return function (done){
            /**
             * Set options.generator equal to the context of the current gulp taks;
             * @type {Object};
             */
            options.generator = new Generator( this, options, __this );
            _.extend(gulp.tasks.default, options.generator);
            // console.log(options.generator.templates)
            options.doneCallback = done;

            return __stream.validate( options )

                .then( __stream.flow          )
                .then( __stream.defaults      )
                .then( __stream.prompts       )
                .then( __stream.configuration )
                .then( __stream.filter        )
                .then( __stream.paths         )
                .then( __stream.use           )
                .catch( done )
          }
        }
        function use ( options ) {

          // Calls Slushy.use( options )
          return options.__Generator(plugins, options.paths, options.filters, options.generator.templates, options.generator);
        }

        function validate ( options ) {
          var $promised = Q.defer();
          $promised.resolve( __this.validate(options) );
          return $promised.promise;

        }

        function flow ( options ) {

          // Calls Slushy.flow( options ); and promises it's return value;
          return __this.flow( options )
        }

        function defaults (options) {

          // Calls Slushy.defaults( options );
          return __this.defaults( options );
        }
        function prompts ( options ) {

          // Calls Slushy.prompts( options )
          return __this.prompts( options );
        }
        function configuration ( options ) {

          // if(default) Slushy.initConfig( options ) else Slushy.setConfig( options )
          return __this.configuration( options );
        }
        function filter( options ) {
          // Calls Slushy.filter to generator filters for templates.
          return __this.filter( options );
        }
        function paths ( options ) {
          // Calls slush_y.paths to generate paths for templating.
          return __this.paths( options );
        }
        function register(){

          return __this.register(__dirname);
        }

    }).call(slush_y);


}).call(this);

