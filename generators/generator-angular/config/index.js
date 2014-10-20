(function(){
  'use strict';


  var fs = require('fs-extra');
  var _ = require('lodash');
  var gulp = require('gulp');
  var chalk = require('chalk');
  var $ = require('gulp-load-plugins')({lazy:false});
  var Slushy = require('../../../Slushy.js');
  var path = require('path')
  // var Modules = require('../../../config/modules.js');

  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */
  module.exports = function(){

      var y = this;
      var done
      var controller = require('./controller.js');
      var prompts = require('./prompts');
      var templates = __dirname + '/templates/*.js';
      var modulesDir = this.get('modulesDir');

      // console.log(Modules);



      return Configuration;



      /**
       * [The Controller Generater will call this as a call back, and pass in a done method]
       * @param  {Function} done [call done() in order to stop the gulp stre]
       * @return {Promise} [Returns a promise that the gulprunner when the gulp runner is complete]
       */
      function Configuration (done){

        return controller.getCurrentModules( prompts, modulesDir)
          .then( controller.ask )
          .then( GenerateTemplates )
          // .then( done );
      }


      function GenerateTemplates( options ){
        console.log(options)

        var dest = y.get('modulesDir');
        if(options.moduleName === 'core'){
          dest = y.get('appDir');
        }
        gulp.src( templates )
          .pipe( $.template( options ))
          .pipe( $.rename(function ( file ) {
            file = controller.proccessFile( file, options );
          }))
          .pipe( $.conflict( path.join(dest, options.slugifiedModuleName, '/config/')) )
          .pipe( gulp.dest( path.join(dest, options.slugifiedModuleName, '/config/') ))

      }


  }



})();











// var controller = require('./controller.js');

// // module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
//   var fs = require('fs');
//   gulp.task('config', function (done) {

//     if (!this.args[0]) {
//       controller.argsError();
//       return done();
//     }

//     var moduleName = this.args[0];
//     var modulesFolder = process.cwd() + '/client/app/modules/';
//     var templateDir = __dirname + '/templates/';

//     var prompts = [{
//       type: 'list',
//       name: 'moduleName',
//       default: 'core',
//       message: 'Which module does this configuration file belongs to?',
//       choices: [{ value: 'core', name: 'core' }]
//     }];

//     prompts = controller.getCurrentModules(prompts, modulesFolder);

//     controller
//       .ask( prompts, moduleName )
//       .then( GenerateTemplates )
//       .catch(done);

//       function GenerateTemplates( answers ){

//         if(answers.moduleName === 'core'){
//           modulesFolder = 'client/app/'
//         }

//         gulp.src(templateDir + '*.js')
//           .pipe(template(answers))
//           .pipe(rename(function ( file ) {
//             file = controller.proccessFile( file, answers );
//           }))
//           .pipe( conflict( modulesFolder + answers.slugifiedModuleName + '/config/') )
//           .pipe( gulp.dest( modulesFolder + answers.slugifiedModuleName + '/config/') )
//           .on('end', function () {
//             done();
//           });
//       }

//       // });
//   });
//   // return gulp;
// // };