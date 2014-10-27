var storage = require('./slushy/_Slushy/config/Storage');

module.exports = function(gulp){
  gulp.Gulp.prototype.storage = storage;
  return gulp;
}