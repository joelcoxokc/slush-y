module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, g, config) {
  var fs = require('fs');
  var controller = require('./controller.js');


  gulp.task('controller', function (done) {

    if (!this.args[0]) {
      console.log('******    Incorrect usage of the sub-generator!!                     ******');
      console.log('******    Try slush meanjs:angular-controller <controller-name>      ******');
      console.log('******    Ex: slush meanjs:angular-controller article                ******');
      return done();
    }
    var moduleName = this.args[0];
    var modulesFolder = process.cwd() + '/client/app/modules/';
    var templateDir = __dirname + '/templates/';
    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this controller belongs to?',
      choices: []
    }];

    // Add module choices
    prompts = controller.getCurrentModules( prompts, modulesFolder );

    //Ask
    controller
      .ask( prompts, moduleName )
      .then( GenerateTemplates )
      .catch( done );

    function GenerateTemplates( answers ){

      gulp.src(templateDir + '**')
        .pipe( g.template( answers ) )
        .pipe( g.rename( function ( file ) {
            file = controller.proccessFile( file, answers )
        }))
        .pipe( g.conflict('client/app/modules/' + answers.slugifiedModuleName ) )
        .pipe( gulp.dest('client/app/modules/' + answers.slugifiedModuleName ) )
        .on('end', function () {
          done();
        });
    }
  });
  return gulp;
};