(function(){
  'use strict';


  var path = require('path');
  var controller = require('./helpers/controller.js');


  module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, $, Config){
    var util = require('../../util.js');
    // var globals = new Config('./sulsh-y.json');
    var prompts    = require('./helpers/prompts');

    var templates = {
      module: __dirname + '/templates/angular-module/module/**/*',
      options: __dirname + '/templates/angular-module/options/**/*',
      server: __dirname + '/templates/express-module/**/*'
    }

    var dest = {
      module: './client/modules/',
      options: './client/modules/',
      server: './'
    }

    gulp.task('crud', crudTask);

    function crudTask(done) {
      if(!this.args[0]){
        controller.argsError();
        return done();
      }

      var config = new Config();
      var moduleName = this.args[0];
      console.log(config)

      //Ask
      controller.ask(prompts)
        .then( GenerateTemplates )
        .catch(done);



      function GenerateTemplates( answers ){
        console.log('Staged tamplates')
        answers = util.makeStrings( answers, moduleName );
        controller.prepareDirecories(answers);
        console.log(answers);

        gulp.src( templates.server )
            .pipe($.template( answers ))
            .pipe($.rename(function ( file ) {
              file = controller.processFile( file, answers )
            }))
            .pipe($.conflict('./'))
            .pipe(gulp.dest( dest.server, answers.slugifiedSingularName ))

        gulp.src( templates.module )
            .pipe($.template( answers ))
            .pipe($.rename(function(file) {
              file = controller.processFile( file, answers )
            }))
            .pipe($.conflict( dest.modeul + answers.slugifiedPluralName ))
            .pipe(gulp.dest( dest.module + answers.slugifiedPluralName ))


        gulp.src(tamplates.options + globals.data.httpType )
            .pipe($.template( answers ))
            .pipe($.rename(function (file) {
                  file = controller.processFile( file, answers );
               }))
            .pipe($.conflict(  dest.slugifiedPluralName ))
            .pipe(gulp.dest( dest.module + answers.slugifiedPluralName ))
            .on('end', function () {
                done();
            });
        return gulp
      }
    }

    return gulp;
  }
})();



