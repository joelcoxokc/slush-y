var path = require('path');
module.exports = function(gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, g, Config){
  gulp.task('crud', function (done) {

    var globals = new Config('./soa.json');
    var moduleDir = __dirname + '/../templates/crud-module/angular-module/';
    var serverDir = __dirname + '/../templates/crud-module/express-module/';
    console.log(globals);

    if(!this.args[0])
    {
      console.log('******    Incorrect usage of the sub-generator!!        ******');
      console.log('******    Try slush meanjs:crud-module <module-name>    ******');
      console.log('******    Ex: slush meanjs:crud-module article          ******');
      return done();
    }
    var moduleName = this.args[0];

      var prompts = [{
            type: 'checkbox',
            name: 'folders',
            message: 'Which supplemental folders would you like to include in your angular module?',
            choices: [{
                value: 'addCSSFolder',
                name: 'css',
                checked: true
            }, {
                value: 'addImagesFolder',
                name: 'img',
                checked: true
            }, {
                value: 'addDirectivesFolder',
                name: 'directives',
                checked: true
            }, {
                value: 'addFiltersFolder',
                name: 'filters',
                checked: true
            }]
        }, {
            type: 'confirm',
            name: 'addMenuItems',
            message: 'Would you like to add the CRUD module links to a menu?',
            default: true
        }];
      //Ask
      inquirer.prompt(prompts,
          function (answers) {
            if (!answers) {
                  return done();
              }

            answers.addCSSFolder = _.contains(answers.folders, 'addCSSFolder');
            answers.addImagesFolder = _.contains(answers.folders, 'addImagesFolder');
            answers.addDirectivesFolder = _.contains(answers.folders, 'addDirectivesFolder');
            answers.addFiltersFolder = _.contains(answers.folders, 'addFiltersFolder');
            answers.addMenuItems = answers.addMenuItems;
            // modulenames
            answers.slugifiedName = _.slugify(moduleName);

            answers.slugifiedPluralName = inflections.pluralize(answers.slugifiedName);
            answers.slugifiedSingularName = inflections.singularize(answers.slugifiedName);
            answers.camelizedPluralName = _.camelize(answers.slugifiedPluralName);
            answers.camelizedSingularName = _.camelize(answers.slugifiedSingularName);
            answers.classifiedPluralName = _.classify(answers.slugifiedPluralName);
            answers.classifiedSingularName = _.classify(answers.slugifiedSingularName);
            answers.humanizedPluralName = _.humanize(answers.slugifiedPluralName);
            answers.humanizedSingularName = _.humanize(answers.slugifiedSingularName);

            //client folders
            if (answers.addCSSFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/css');
            if (answers.addImagesFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/img');
            if (answers.addDirectivesFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/directives');
            if (answers.addFiltersFolder) mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/filters');

            // Create client folders for ng
          mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/config');
          mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/controllers');
          mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/services');
          mkdirp('client/app/modules/' + answers.slugifiedPluralName + '/tests');

          answers.restangular = globals.data.restangular;
          answers.httpType = globals.data.httpType;
          answers.http = globals.data.http;

        // express-modules
            gulp.src( serverDir + 'server/thing/**')
              .pipe(template(answers))
              .pipe(rename(function(file) {
                        if (file.basename.indexOf('_') == 0) {
                            file.basename = answers.slugifiedSingularName + '.'+file.basename.slice(2);
                        }
                 }))
              .pipe(conflict('./'))
              .pipe(gulp.dest('./server/api/' + answers.slugifiedSingularName));

          // Menu configuration
            if (answers.addMenuItems) {
              answers.menuId = 'topbar';
                gulp.src( moduleDir + 'base/config/**' )
              .pipe(template(answers))
              .pipe(rename(function(file) {
                        if (file.basename.indexOf('_') == 0) {
                            file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
                        }
                 }))
              .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
              .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'));
            }

            gulp.src( moduleDir + 'base/views/**' )
              .pipe(template(answers))
              .pipe(rename(function(file) {
                        if (file.basename.indexOf('list') >= 0) {
                            file.basename = file.basename.replace('_', answers.slugifiedPluralName) ;
                        }
                        else {
                            file.basename = file.basename.replace('_', answers.slugifiedSingularName) ;
                        }
                 }))
              .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
              .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'));

          gulp.src( moduleDir + 'base/client/**' )
              .pipe(template(answers))
              .pipe(rename(function(file) {
                        if (file.basename.indexOf('_') == 0) {
                            file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
                        }
                 }))
              .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
              .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'))

              console.log(moduleDir + globals.data.httpType + '/client/**')

          gulp.src( moduleDir + globals.data.httpType + '/client/**' )
              .pipe(template(answers))
              .pipe(rename(function(file) {
                        if (file.basename.indexOf('_') == 0) {
                            file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
                        }
                 }))
              .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
              .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'))
              .on('end', function () {
                    done();
                });

          });
  });
  return gulp;
}