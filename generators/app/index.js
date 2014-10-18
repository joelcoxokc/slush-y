var fs = require('fs-extra');
module.exports = function(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, $, config){
  gulp.task('default', function (done) {


      var values = {};
      var controller = require('./controller.js');
      var templatePath = __dirname + '/templates/';

      var prompts = require('./prompts.js');
      console.log(templatePath)
      //Ask
      controller
        .ask( prompts )
        .then( GenerateTemplates )
        .catch( done );


      function GenerateTemplates( values ){
          console.log(values)
          var serverTemplatesDir;
          if( values.auth ){
            serverTemplatesDir = 'auth';
          }
          if( values.base ){
            serverTemplatesDir = 'base';
          }

          gulp
            .src( templatePath + 'slush-y.json')
              .pipe($.jsonEditor( function (json){
                return values;
              }))
              .pipe( gulp.dest('./') )

          gulp
            .src(templatePath + 'servers/**/*')
              .pipe($.rename( function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe(gulp.dest('./'));

          gulp
            .src(templatePath + 'static/**/*')
              .pipe($.rename(function (file) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./'));

          gulp
            .src(templatePath + 'clients/'+values.script+'/client/**/*')
              .pipe($.rename(function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./client/app'))

          gulp
            .src(templatePath + 'clients/'+values.script+'/options/'+values.httpType+'/**/*')
              .pipe($.rename(function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe($.template( values ))
              .pipe($.conflict('./'))
              .pipe( gulp.dest('./client/app'))
              .pipe($.install())
              .on('end', function () {
                  done();
              });
      }


  });
  return gulp;
}