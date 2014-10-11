var fs = require('fs-extra');
module.exports = function(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g){
  gulp.task('default', function (done) {
      // var values = config.get()
      var values = {}

      var templatePath = __dirname + '/../templates';

      var prompts = [{
              name: 'appName',
              message: 'What would you like to call your application?',
              default: 'MEAN'
          }, {
              name: 'appDescription',
              message: 'How would you describe your application?',
              default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
          }, {
              name: 'appKeywords',
              message: 'How would you describe your application in comma seperated key words?',
              default: 'MongoDB, Express, AngularJS, Node.js'
          }, {
              name: 'appAuthor',
              message: 'What is your company/author name?'
          }, {
              type: 'list',
              name: 'script',
              message: 'What script would you like to use?',
              choices: [{
                value: 'js',
                name: 'Javascript',
                default: true
              }]
          }, {
              type: 'list',
              name: 'httpType',
              message: 'How would you like to handle your http requests?',
              choices: [{
                value: 'restangular',
                name: 'Restangular',
                default: true
              },{
                value: 'http',
                name: 'angular $http',
                default: false
              }]
          },{
              type: 'checkbox',
              name: 'modules',
              message: 'Which AngularJS modules would you like to include?',
              choices: [{
                  value: 'angularCookies',
                  name: 'ngCookies',
                  checked: true
              }, {
                  value: 'angularAnimate',
                  name: 'ngAnimate',
                  checked: true
              }, {
                  value: 'angularTouch',
                  name: 'ngTouch',
                  checked: true
              }, {
                  value: 'angularSanitize',
                  name: 'ngSanitize',
                  checked: true
              }]
          }];
      //Ask
      inquirer.prompt(prompts,
          function (answers) {
            if (!answers.appName) {
                  return done();
              }
              console.log(answers)
              values.slugifiedAppName = _.slugify(answers.appName);
              values.humanizedAppName = _.humanize(answers.appName);
              values.capitalizedAppAuthor = _.capitalize(answers.appAuthor);
              values.angularCookies = _.contains(answers.modules, 'angularCookies');
              values.angularAnimate = _.contains(answers.modules, 'angularAnimate');
              values.angularTouch = _.contains(answers.modules, 'angularTouch');
              values.angularSanitize = _.contains(answers.modules, 'angularSanitize');
              values.clientDir = './client';
              values.serverDir = './server';

              values.script = answers.script;
              values[ answers.script ] = true;

              values.httpType = answers.httpType;
              values[answers.httpType] = true;
              if(answers.httpType !== 'restangular'){ values.restangular = false; }
              if(answers.httpType !== 'http'){ values.http = false; }

              console.log(values)
              gulp.src(__dirname + '/../templates/app/static/**/*')
                  .pipe(rename(function(file) {
                          if (file.basename.indexOf('__') == 0) {
                              file.basename = '.' + file.basename.slice(2);
                          }
                   }))
                  .pipe(template(values))
                  .pipe(conflict('./'))
                  .pipe(gulp.dest('./'));

              gulp.src(__dirname + '/../templates/app/clients/'+values.script+'/**/*')
                  .pipe(rename(function(file) {
                          if (file.basename.indexOf('__') == 0) {
                              file.basename = '.' + file.basename.slice(2);
                          }
                   }))
                  .pipe(template(values))
                  .pipe(conflict('./'))
                  .pipe(gulp.dest('./client'))

              gulp.src(__dirname + '/../templates/app/clients/choice/'+values.httpType+'/**/*')
                  .pipe(rename(function(file) {
                          if (file.basename.indexOf('__') == 0) {
                              file.basename = '.' + file.basename.slice(2);
                          }
                   }))
                  .pipe(template(values))
                  .pipe(conflict('./'))
                  .pipe(gulp.dest('./client/app'))


              gulp.src( templatePath + '/app/soa.json')
                  .pipe( g.jsonEditor( function (json){
                    return values;
                  } ) )
                  .pipe( gulp.dest('./') )
                  .pipe(install())
                  .on('end', function () {
                      done();
                  });
          });




  });
  return gulp;
}