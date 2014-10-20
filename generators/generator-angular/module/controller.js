// (function (){
        'use strict';

        var Q               = require('q');
        var util            = require('util');
        var _               = require('lodash');
        var prompts         = require('./prompts.js');
        var Utility         = require('../../../util.js');
        var Slushy          = require('../../../Slushy.js');
        var BaseController  = require('../../../config/BaseController.js');

      function Controller(args){
        BaseController.apply(this, arguments);
        this.module = 'module'
        this.prompts      = prompts;

        _.assign(this,  this.util.makeStrings({}, 'Joel Thomas Cox') );

        console.log(this)
      }

      util.inherits(Controller, BaseController);

      Controller.prototype.handleErrors = function(args){

          var promised = Q.defer();
          if(!args[0]){
              Utility.argsError('module');
              return promised.reject();
          }
          this.moduleName  = args[0];
          promised.resolve(this.moduleName);
          return promised.promise;
      }

      Controller.prototype.getModules = function(){

      }

      module.exports = new Controller;

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