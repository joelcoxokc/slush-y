module.exports = function(gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp){
  var fs = require('fs');
  gulp.task('view', function (done) {

    if(!this.args[0])
    {
      console.log('******    Incorrect usage of the sub-generator!!           ******');
      console.log('******    Try slush meanjs:angular-view <view-name>        ******');
      console.log('******    Ex: slush meanjs:angular-view article            ******');
      return done();
    }
    var moduleName = this.args[0];
    var modulesFolder = process.cwd() + '/client/app/modules/';
    var templateDir = __dirname + '/templates/';

       var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this view belongs to?',
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
        answers.humanizedModuleName = _.humanize(answers.moduleName);

        answers.slugifiedName = _.slugify(_.humanize(moduleName));
        answers.classifiedName = _.classify(answers.slugifiedName);
        answers.humanizedName = _.humanize(answers.slugifiedName);

        var prompts = [{
          name: 'controllerName',
          message: 'What is the name of the controller this view will use?',
          default: answers.classifiedName
        },{
          type: 'confirm',
          name: 'addRoute',
          message: 'Would you like to add a route for this view?',
          default: true
        }];

        inquirer.prompt(prompts,function (ans) {
              if (!ans) {
                    return done();
                }
                answers.controllerName = ans.controllerName;
                answers.addRoute = ans.addRoute;

          answers.slugifiedControllerName = _.slugify(answers.controllerName);
          answers.classifiedControllerName = _.classify(answers.slugifiedControllerName);

          if(answers.addRoute)
          {
            var prompts = [{
              name: 'routePath',
              message: 'What is your view route path?',
              default: answers.slugifiedName
            }];
            inquirer.prompt(prompts,function (ans) {
              console.log(answers.addRoute)
              if (!ans) {
                        return done();
                    }

                answers.routePath = ans.routePath;
                answers.slugifiedRoutePath = _.slugify(answers.routePath);
            });

            var routesFilePath = process.cwd() + '/client/app/modules/' + answers.slugifiedModuleName + '/config/' + answers.slugifiedModuleName +  '.routes.js';

            if (fs.existsSync(routesFilePath)) {
               gulp.src(templateDir + '_.route.js')
                    .pipe(template(answers))
                    .pipe(rename(function(file) {
                              if (file.basename.indexOf('_') == 0) {
                                  file.basename = file.basename.replace('_','temp');
                              }
                       }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .on('end', function () {
                          var routesFileContent = fs.readFileSync(routesFilePath, "utf8");
                      var compiledTemplate = fs.readFileSync('temp.route.js', "utf8");
                      fs.writeFile(routesFilePath,routesFileContent.replace('$stateProvider', compiledTemplate),function(){
                        fs.unlinkSync('./temp.route.js');
                    });
                      });
                 }
                 else
                 {
                  //create the req folders
                  mkdirp('client/app/modules/' + answers.slugifiedModuleName + '/config');
                  gulp.src(templateDir + '_.routes.js')
                    .pipe(template(answers))
                    .pipe(rename(function(file) {
                              if (file.basename.indexOf('_') == 0) {
                                  file.basename = file.basename.replace('_', answers.slugifiedModuleName);
                              }
                       }))
                    .pipe(conflict('client/app/modules/' + answers.slugifiedModuleName + '/config/'))
                    .pipe(gulp.dest('client/app/modules/' + answers.slugifiedModuleName + '/config/'));
                 }

                 gulp.src(templateDir + '_.view.html')
               .pipe(template(answers))
               .pipe(rename(function(file) {
                  if (file.basename.indexOf('_') == 0) {
                      file.basename = file.basename.replace('_', answers.slugifiedModuleName);
                  }
               }))
               .pipe(conflict('client/app/modules/' + answers.slugifiedModuleName + '/views/'))
               .pipe(gulp.dest('client/app/modules/' + answers.slugifiedModuleName + '/views/'))
               .on('end', function () {
                done();
              });
          }

            });


  });
  });
  return gulp;
};