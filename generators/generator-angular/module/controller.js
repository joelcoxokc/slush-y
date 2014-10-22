// (function (){
        'use strict';



// })();


 // if(!this.args[0])
 //    {
 //      console.log('******    Incorrect usage of the sub-generator!!           ******');
 //      console.log('******    Try slush meanjs:angular-module <module-name>    ******');
 //      console.log('******    Ex: slush meanjs:angular-module article          ******');
 //      return done();
 //    }
 //    var moduleName = this.args[0];
 //    var templateDir = __dirname + '/templates/';
 //    var prompts = require('./prompts.js')

 //      //Ask
 //      inquirer.prompt(prompts,
 //          function (answers) {
 //            if (!answers) {
 //                  return done();
 //              }

 //               // modulename
 //              answers.slugifiedName = _.slugify(_.humanize(moduleName));


 //              answers.addConfigFolder = _.contains(answers.folders, 'addConfigFolder');
 //        answers.addControllersFolder = _.contains(answers.folders, 'addControllersFolder');
 //        answers.addStylesFolder = _.contains(answers.folders, 'addStylesFolder');
 //        answers.addDirectivesFolder = _.contains(answers.folders, 'addDirectivesFolder');
 //        answers.addFiltersFolder = _.contains(answers.folders, 'addFiltersFolder');
 //        answers.addImagesFolder = _.contains(answers.folders, 'addImagesFolder');
 //        answers.addServicesFolder = _.contains(answers.folders, 'addServicesFolder');
 //        answers.addTestsFolder = _.contains(answers.folders, 'addTestsFolder');
 //        answers.addViewsFolder = _.contains(answers.folders, 'addViewsFolder');

 //        // create root folder
 //        mkdirp('client/app/modules/' + answers.slugifiedName);

 //            // Create module sub-folders
 //        if (answers.addConfigFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/config');
 //        if (answers.addControllersFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/controllers');
 //        if (answers.addStylesFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/styles');
 //        if (answers.addDirectivesFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/directives');
 //        if (answers.addFiltersFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/filters');
 //        if (answers.addImagesFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/images');
 //        if (answers.addServicesFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/services');
 //        if (answers.addTestsFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/tests');
 //        if (answers.addViewsFolder) mkdirp('client/app/modules/' + answers.slugifiedName + '/views');

 //          gulp.src(templateDir + '/**')
 //              .pipe(template(answers))
 //              .pipe(rename(function(file) {
 //                        if (file.basename.indexOf('_') == 0) {
 //                            file.basename = file.basename.replace('_',answers.slugifiedName);
 //                        }
 //                 }))
 //              .pipe(conflict('client/app/modules/' + answers.slugifiedName+'/'))
 //              .pipe(gulp.dest('client/app/modules/' + answers.slugifiedName+'/'))
 //              .on('end', function () {
 //                    done();
 //                });

 //          });