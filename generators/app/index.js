var fs = require('fs-extra');
module.exports = function(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, g){
  gulp.task('default', function (done) {
      // var values = config.get()
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
            .src(templatePath + 'servers/**/*')
              .pipe( g.rename( function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe( g.template( values ))
              .pipe( g.conflict('./'))
              .pipe( gulp.dest('./'));

          gulp
            .src(templatePath + 'static/**/*')
              .pipe( g.rename(function (file) {
                  file = controller.proccessFile( file );
               }))
              .pipe( g.template( values ))
              .pipe( g.conflict('./'))
              .pipe( gulp.dest('./'));

          gulp
            .src(templatePath + 'clients/'+values.script+'/client/**/*')
              .pipe( g.rename(function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe( g.template( values ))
              .pipe( g.conflict('./'))
              .pipe( gulp.dest('./client/app'))

          gulp
            .src(templatePath + 'clients/'+values.script+'/options/'+values.httpType+'/**/*')
              .pipe( g.rename(function ( file ) {
                  file = controller.proccessFile( file );
               }))
              .pipe( g.template( values ))
              .pipe( g.conflict('./'))
              .pipe( gulp.dest('./client/app'))


          gulp
            .src( templatePath + 'soa.json')
              .pipe( g.jsonEditor( function (json){
                return values;
              }))
              .pipe( gulp.dest('./') )
              .pipe( g.install())
              .on('end', function () {
                  done();
              });
      }




  });
  return gulp;
}