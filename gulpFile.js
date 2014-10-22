var gulp = require('gulp')
var del = require('del');


gulp.task('prep', del.bind(null, [
  '../slush-y-demo/**/*',
  '!../slush-y-demo/node_modules/**/*',
  '!../slush-y-demo/client/bower_components/**/*'
]));