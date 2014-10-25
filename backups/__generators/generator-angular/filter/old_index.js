// module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
//   var fs = require('fs');
//   gulp.task('filter', function (done) {

//     // if (!this.args[0]) {
//       console.log('******    FILTER IS TEMPORARILY NOT WORKING                       ******');

//       return done();
//     // }
//     var moduleName = this.args[0];
//     var modulesFolder = process.cwd() + '/client/app/modules/';
//     var templateDir = __dirname + '/templates/';

    // var prompts = [{
    //   type: 'list',
    //   name: 'moduleName',
    //   default: 'core',
    //   message: 'Which module does this filter belongs to?',
    //   choices: [{
    //     name: 'core',
    //     value: 'core'
    //   },{
    //     name: 'authentication',
    //     value: 'authentication'
    //   }]
    // }];

//     // Add module choices
//         fs.readdirSync(modulesFolder).forEach(function(folder) {
//             var stat = fs.statSync(modulesFolder + '/' + folder);

//             if (stat.isDirectory()) {
//                 prompts[0].choices.push({
//                   value: folder,
//                   name: folder
//                 });
//             }
//         });

//     //Ask
//     inquirer.prompt(prompts,
//       function (answers) {
//         if (!answers) {
//           return done();
//         }

//         answers.slugifiedModuleName = _.slugify(answers.moduleName);
//         answers.slugifiedName = _.slugify(_.humanize(moduleName));
//         answers.camelizedName = _.camelize(answers.slugifiedName);
//         answers.humanizedName = _.humanize(answers.slugifiedName);

//         var destination = 'client/app/modules/'
//         if( answers.moduleName === 'core' || answers.moduleName === 'authentication' ){
//           var destination = 'client/app/'
//         }
//         gulp.src(templateDir + '*.js')
//               .pipe(template(answers))
//               .pipe(rename(function(file) {
//                     if (file.basename.indexOf('_') == 0) {
//                             file.basename = file.basename.replace('_', answers.slugifiedName);
//                         }
//                  }))
//               .pipe(conflict( destination + answers.slugifiedModuleName + '/filters/'))
//               .pipe(gulp.dest( destination + answers.slugifiedModuleName + '/filters/'))
//               .on('end', function () {
//                    done();
//                 });
//       });
//   });
//   return gulp;
// };