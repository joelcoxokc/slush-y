module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
  var fs = require('fs');
  gulp.task('config', function (done) {

    if (!this.args[0]) {
      console.log('******    Incorrect usage of the sub-generator!!                ******');
      console.log('******    Try slush meanjs:angular-config <config-name>         ******');
      console.log('******    Ex: slush meanjs:angular-config article               ******');
      return done();
    }
    var moduleName = this.args[0];
    var modulesFolder = process.cwd() + '/client/app/modules/';

    var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this configuration file belongs to?',
      choices: [{
        value: 'core',
        name: 'core'
      }]
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

        answers.slugifiedModuleName = _.slugify(_.humanize(answers.moduleName));
              answers.humanizedModuleName = _.humanize(answers.moduleName);
              answers.slugifiedName = _.slugify(moduleName);

        var destination = 'client/app/modules/'
        if(answers.moduleName === 'core'){
          destination = 'client/app/'
        }
        gulp.src(__dirname + '/../templates/angular-config/_.client.config.js')
              .pipe(template(answers))
              .pipe(rename(function(file) {
                    if (file.basename.indexOf('_') == 0) {
                            file.basename = file.basename.replace('_', answers.slugifiedName);
                        }
                 }))
              .pipe( conflict( destination+ answers.slugifiedModuleName + '/config/'))
              .pipe( gulp.dest( destination+ answers.slugifiedModuleName + '/config/'))
              .on('end', function () {
                   done();
                });
      });
  });
  return gulp;
};