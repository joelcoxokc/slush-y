;(function(){

  'use strict';

    module.exports = function(gulp, inquirer, $, _, path, _str){

      /**
       * Reveal the Slushy Class endpoint.
       * @type {Class}
       */
      var slushy = this;

      var prompts = require('./prompts.js')(slushy);

      /**
       * Expose the gulp endpoint.
       * slushy.use() will return a callback function for gulp to call.
       * this is so we can expose the gulp callback parameters to Slushy's configurations.
       * Slushy will call the Filter function and pass a new parameter called options.
       */
      return gulp.task('filter', slushy.use( Filter ) )

      function Filter( done, options ){

        return slushy.ask(prompts, options)

          .then( slushy.generate( GenerateTemplates ) )

          .catch( done )

      }


      function GenerateTemplates( options ){

        gulp.src( options.src().scripts() )
          .pipe($.template( options ))
          .pipe($.rename(function (file){
            file = slushy.processFile(true, file, options);
          }))
          .pipe( $.conflict( options.dest().final('filters') ) )
          .pipe( gulp.dest( options.dest().final('filters') ) )

      }

    }

}).call(this);