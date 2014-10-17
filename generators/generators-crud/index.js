(function(){
  'use strict';


  var path = require('path');
  var controller = require('./helpers/controller.js');


  module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, $, Config){
    var util = require('../../util.js');
    // var globals = new Config('./sulsh-y.json');
    var moduleDir = __dirname + '/templates/client/**/*';
    var serverDir = __dirname + '/templates/server/**/*';
    var prompts = require('./helpers/prompts');




    gulp.task('crud', crudTask);



    return gulp;

    function crudTask(done) {
      if(!this.args[0]){
        util.argsError();
        return done();
      }

      var config = new Config();
      var moduleName = this.args[0];
      console.log(config)

      //Ask
      controller.ask(prompts)
        .then( stageTemplates )
        .then( stageTemplates );

      function stageTemplates( answers ){
        answers = util.stringify( answers, moduleName );
        controller.prepareDirecories(answers);
        return answers;
      }

      function stageTemplates(){

        gulp.src( serverDir + 'server/thing/**')
            .pipe( $.template(answers))
            .pipe( $.rename(function (file) {
              file = controller.processFile( file, answers )
            }))
            .pipe( $.conflict('./'))

            .pipe(gulp.dest('./server/api/' + answers.slugifiedSingularName))

            .pipe( template(answers))
            .pipe(rename(function(file) {

              file = controller.processServerFiles;
            }))
            .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
            .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'));



        gulp.src( moduleDir + 'base/client/**' )
            .pipe(template(answers))
            .pipe(rename(function(file) {
              file = constroller.processFile( file )
            }))
            .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
            .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'))

            console.log(moduleDir + globals.data.httpType + '/client/**')

        gulp.src( moduleDir + globals.data.httpType + '/client/**' )
            .pipe(template(answers))
            .pipe(rename(function(file) {
                  file = constroller.processFile();
               }))
            .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
            .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'))
            .on('end', function () {
                  done();
              });
      }
    }
  }
})();



