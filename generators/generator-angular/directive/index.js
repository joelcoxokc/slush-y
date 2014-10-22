(function(){
  'use strict';


    module.exports = function (gulp, inquirer, $, _, path, _str) {

        // var gulp = require('gulp');
        // var fs            = require('fs');
        // var moduleName    = this.args[0];
        // var modulesDir    = y.get('modulesDir')
        // var path          = require('path');
        // var templates     = templateDir + '**/*';
        // var controller    = require('./controller.js');
        // var temaplets     = __dirname + '/templates/';
        var y         = this;
        var prompts   = require('./prompts.js');


        return gulp.task('directive', this.use(Directive));


        function Directive( done, options ){

          prompts = this.findModules(prompts)
          return this.ask(prompts, options)
            .then(this.generate(GenerateTemplates))
            .catch(done);

        }



        function GenerateTemplates( options ){
          gulp.src( options.templateDir + '/*.js' )
            .pipe( $.template( options ))
            .pipe( $.rename(function ( file ) {

              file = y.processFile(true, file, options );

            }))
            .pipe( $.conflict( options.moduleDir + '/directives'))
            .pipe( gulp.dest( options.moduleDir + '/directives'));
        }
    };

})();