(function(){
  'use strict';


  module.exports = function (gulp, inquirer, $, _, path, _str) {

    // var gulp = require('gulp');
    // var fs            = require('fs');
    // var moduleName    = slushy.args[0];
    // var modulesDir    = slushy.get('modulesDir')
    // var path          = require('path');
    // var templates     = templateDir + '**/*';
    // var controller    = require('./controller.js');
    // var temaplets     = __dirname + '/templates/';
    var slushy    = this;
    var prompts   = require('./prompts.js')(slushy);

    return gulp.task('directive', slushy.task(Directive));

    function Directive( done, options ){

      return slushy.ask( prompts, options )
      .then( slushy.generate( GenerateTemplates ) )
      .catch( done );

    }

    function GenerateTemplates( options ){
      gulp.src( options.src().scripts() )
        .pipe( $.template( options ))
        .pipe( $.rename(function ( file ) {

          file = slushy.processFile(true, file, options );

        }))
        .pipe( $.conflict( options.dest().final('directives') ))
        .pipe( gulp.dest( options.dest().final('directives') ));
    }
  };

})();