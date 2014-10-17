(function(){
  'use strict';


  var path = require('path');
  var controller = require('./helpers/controller.js');
  var util = require('../../util.js');
  var globals = new Config('./soa.json');
  var moduleDir = __dirname + '/../templates/crud-module/angular-module/';
  var serverDir = __dirname + '/../templates/crud-module/express-module/';
  var prompts = reuire('./helpers/prompts');


  module.exports = Crud;

  return gulp;


  function Crud(gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, $, Config){

    gulp.task('crud', crudTask);

    var config = new Config('./slush-y.json');

    config.get('modules')

    function crudTask(done) {
      if(!this.args[0]){
        util.argsError();
        return done();
      }

      var moduleName = this.args[0];

      //Ask
      controller.ask(prompts)
        .then(function (answers){
          answers = util.stringify( answers, moduleName );
          controller.prepareDirecories(answers);
          return answers;
        })
        .then(function (data){

          gulp.src( serverDir + 'server/thing/**')
            .pipe(template(answers))
            .pipe(rename(function (file,) {
              file = controller.processFile( file, answers )
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./server/api/' + answers.slugifiedSingularName));



        });


      //   // Menu configuration
      //     if (answers.addMenuItems) {
      //       answers.menuId = 'topbar';
      //         gulp.src( moduleDir + 'base/config/**' )
      //       .pipe(template(answers))
      //       .pipe(rename(function(file) {
      //                 if (file.basename.indexOf('_') == 0) {
      //                     file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
      //                 }
      //          }))
      //       .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
      //       .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'));
      //     }

      //     gulp.src( moduleDir + 'base/views/**' )
      //       .pipe(template(answers))
      //       .pipe(rename(function(file) {
      //                 if (file.basename.indexOf('list') >= 0) {
      //                     file.basename = file.basename.replace('_', answers.slugifiedPluralName) ;
      //                 }
      //                 else {
      //                     file.basename = file.basename.replace('_', answers.slugifiedSingularName) ;
      //                 }
      //          }))
      //       .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
      //       .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'));

      //   gulp.src( moduleDir + 'base/client/**' )
      //       .pipe(template(answers))
      //       .pipe(rename(function(file) {
      //                 if (file.basename.indexOf('_') == 0) {
      //                     file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
      //                 }
      //          }))
      //       .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
      //       .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'))

      //       console.log(moduleDir + globals.data.httpType + '/client/**')

      //   gulp.src( moduleDir + globals.data.httpType + '/client/**' )
      //       .pipe(template(answers))
      //       .pipe(rename(function(file) {
      //                 if (file.basename.indexOf('_') == 0) {
      //                     file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
      //                 }
      //          }))
      //       .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
      //       .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'))
      //       .on('end', function () {
      //             done();
      //         });

        });
    }
  }
})();