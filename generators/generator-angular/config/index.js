var controller = require('./controller.js');

module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
  var fs = require('fs');
  gulp.task('config', function (done) {

    if (!this.args[0]) {
      controller.argsError();
      return done();
    }

    var moduleName = this.args[0];
    var modulesFolder = process.cwd() + '/client/app/modules/';
    var templateDir = __dirname + '/templates/';

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this configuration file belongs to?',
      choices: [{ value: 'core', name: 'core' }]
    }];

    prompts = controller.getCurrentModules(prompts, modulesFolder);

    controller
      .ask( prompts, moduleName )
      .then( GenerateTemplates )
      .catch(done);

      function GenerateTemplates( answers ){

        if(answers.moduleName === 'core'){
          modulesFolder = 'client/app/'
        }

        gulp.src(templateDir + '*.js')
          .pipe(template(answers))
          .pipe(rename(function ( file ) {
            file = controller.proccessFile( file, answers );
          }))
          .pipe( conflict( modulesFolder + answers.slugifiedModuleName + '/config/') )
          .pipe( gulp.dest( modulesFolder + answers.slugifiedModuleName + '/config/') )
          .on('end', function () {
            done();
          });
      }

      // });
  });
  return gulp;
};