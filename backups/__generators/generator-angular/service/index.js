;(function(){

  'use strict';


    module.exports = function(gulp, inquirer, $, _, path, _str){

      /**
       * Reveal the Slushy Class endpoint.
       * @type {Class}
       */
      var slushy    = this;
      var prompts   = require('./prompts.js')(slushy);

      /**
       * Expose the gulp endpoint.
       * slushy.use() will return a callback function for gulp to call.
       * this is so we can expose the gulp callback parameters to Slushy's configurations.
       * Slushy will call the Filter function and pass a new parameter called options.
       */
      return gulp.task('service', slushy.task( Service ) );

      /**
       * Service Method callback Slushy invokes, that would initially be passed into gulp's task system;
       * @param {done} done    [done invoke done, to end the gulp task]
       * @param {options}   options Configured options, this comes from calling slush.use();
       */
      function Service( done, options ){

        return slushy.ask(prompts, options)
          .then( slushy.generate( GenerateTemplates ) )
          .catch( done );
      }

      /**
       * Gnerate Templates. Callback us called by slushy, after configuring the {options} Object
       * @param {Object} options [Contains serveral properties, please view the source code for more information at this time.]
       */
      function GenerateTemplates( options ){
        gulp.src( options.src().scripts() )
          .pipe($.template( options ))
          .pipe($.rename(function (file){
            file = slushy.processFile(true, file, options);
          }))
          .pipe( $.conflict( options.dest().final('services') ) )
          .pipe( gulp.dest( options.dest().final('services') ) );

      }

    }

}).call(this);