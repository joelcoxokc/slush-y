(function(){
  'use strict';

  var fs = require('fs');
  var controller = require('./controller.js');

    module.exports = function (gulp, _, inflection, $, config) {
      gulp.task('directive', function (done) {

        if (!this.args[0]) {
          controller.argsError();
          return done();
        }
        var moduleName    = this.args[0];
        var modulesFolder = process.cwd() + '/client/app/modules';
        var templateDir   = __dirname + '/templates/';
        var templates     = templateDir + '**/*';

        var prompts = [{
          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this directive belongs to?',
          choices: [{
            name: 'core',
            value: 'core'
          }]
        }];
        // var prompts = [{
        //   type: 'list',
        //   name: 'moduleName',
        //   default: 'core',
        //   message: 'Which module does this controller belongs to?',
        //   choices: []
        // }];

        // Add module choices
        prompts = controller.getCurrentModules( prompts, modulesFolder );

        //Ask

        controller
          .ask( prompts, moduleName )
          .then( GenerateTemplates )
          .catch( done );

        function GenerateTemplates( answers ){

          // var dest


          var destination = answers.destination + answers.slugifiedModuleName + '/directives/' + answers.slugifiedName;
          gulp.src( templates )
            .pipe( $.template( answers ))
            .pipe( $.rename(function ( file ) {

              file = controller.proccessFile( file, answers );

            }))
             .pipe( $.conflict( destination ))
            .pipe( gulp.dest( destination ))
            .on('end', function () {
              // When finished, close the stream;
              done();
            });
          //
        }
      });
      return gulp;
    };

})();