module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
  var fs = require('fs');
  gulp.task('angular-test', function (done) {

    if (!this.args[0]) {
      console.log('******    Incorrect usage of the sub-generator!!               ******');
      console.log('******    Try slush meanjs:angular-test <controller-name>      ******');
      console.log('******    Ex: slush meanjs:angular-test article                ******');
      return done();
    }
    var moduleName = this.args[0];
    var modulesFolder = process.cwd() + '/client/app/modules/';

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this test belongs to?',
      choices: []
    }];

    // Add module choices
        fs.readdirSync(modulesFolder).forEach(function(folder) {
            var stat = fs.statSync(modulesFolder + '/' + folder);

            if (stat.isDirectory()) {
                prompts[0].choices.push({
                  value: folder,
                  name: folder
                });
            }
        });

    //Ask
    inquirer.prompt(prompts,
      function (answers) {
        if (!answers) {
          return done();
        }

        answers.slugifiedModuleName = _.slugify(answers.moduleName);

        answers.slugifiedControllerName = _.slugify(_.humanize(moduleName));
        answers.classifiedControllerName = _.classify(answers.slugifiedControllerName);
        answers.humanizedControllerName = _.humanize(answers.slugifiedControllerName);

            var controllerFilePath = process.cwd() + '/public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.client.controller.js';

            // If controller file exists we create a test for it otherwise we will first create a controller
        if (!fs.existsSync(controllerFilePath)) {
          gulp.src(__dirname + '/../templates/angular-test/_.client.controller.js')
                .pipe(template(answers))
                .pipe(rename(function(file) {
                      if (file.basename.indexOf('_') == 0) {
                              file.basename = file.basename.replace('_', answers.slugifiedControllerName);
                          }
                   }))
                .pipe(conflict('public/modules/' + answers.slugifiedModuleName + '/controllers/'))
                .pipe(gulp.dest('public/modules/' + answers.slugifiedModuleName + '/controllers/'));
        }

        gulp.src(__dirname + '/../templates/angular-test/_.client.controller.test.js')
              .pipe(template(answers))
              .pipe(rename(function(file) {
                    if (file.basename.indexOf('_') == 0) {
                            file.basename = file.basename.replace('_', answers.slugifiedControllerName);
                        }
                 }))
              .pipe(conflict('public/modules/' + answers.slugifiedModuleName + '/tests/'))
              .pipe(gulp.dest('public/modules/' + answers.slugifiedModuleName + '/tests/'))
              .on('end', function () {
                   done();
                });
      });
  });
  return gulp;
};