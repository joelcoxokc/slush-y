(function(){
  'use strict';

  module.exports = function(gulp, inquirer, $, _, path, _str){

    var y = this;
    var prompts = require('./prompts.js');


    return gulp.task('factory', this.task(Factory));

    //////////////////


    /**
     * 1. Checkout for name argument ... else call done
     * 2. Retrieve all Prompts,
     * 3. bind the prompts to the modules before submitting to inquire submission... before people ask questions
     * 4.
     *
     * @param {Function} done [description]
     */
    function Factory( done, options ){
      prompts = this.findModules(prompts);

      return this.ask(prompts, options)
        .then(this.generate(GenerateTemplates))
        .catch(done);
    }

    function GenerateTemplates( options ){

      gulp.src(options.templateDir + '/*.js')
        .pipe( $.template( options ) )
        .pipe( $.rename( function (file){
          file = y.processFile(true, file, options);
        }))
        .pipe( $.conflict( options.moduleDir + '/services' ))
        .pipe( gulp.dest( options.moduleDir + '/services' ));
    }
  }

})();