(function(){
  'use strict';


    module.exports = function () {

        var gulp = require('gulp');
        var fs            = require('fs');
        var moduleName    = this.args[0];
        var modulesDir    = y.get('modulesDir')
        var path          = require('path');
        var prompts       = require('./prompts.js')
        var templates     = templateDir + '**/*';
        var controller    = require('./controller.js');
        var temaplets     = __dirname + '/templates/';


        return Directive;


        function Directive( done ){

          return controller
            .handleErrors( this.args )
            .then( controller.getModules )
            .then( controller.ask )
            .then( Generate );

        }



        function Generate( options ){

          var dest = path.join(options.destination, options.slugifiedModuleName, '/directives/', options.slugifiedName);
          gulp.src( templates )
            .pipe( $.template( options ))
            .pipe( $.rename(function ( file ) {

              file = controller.proccessFile( file, options );

            }))
            .pipe( $.conflict( destination ))
            .pipe( gulp.dest( destination ))
        }
    };

})();