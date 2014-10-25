module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
	gulp.task('express-route', function (done) {

		if (!this.args[0]) {
			console.log('******    Incorrect usage of the sub-generator!!           ******');
			console.log('******    Try slush meanjs:express-route <route-name>      ******');
			console.log('******    Ex: slush meanjs:express-route article           ******');
			return done();
		}
		var moduleName = this.args[0];
		var answers = {};
        answers.slugifiedName = _.slugify(_.humanize(moduleName));

        gulp.src(__dirname + '/../templates/express-route/**')
	        .pipe(template(answers))
	        .pipe(rename(function(file) {
        	    if (file.basename.indexOf('_') == 0) {
                    file.basename = file.basename.replace('_', answers.slugifiedName);
                }
             }))
	        .pipe(conflict('app/'))
	        .pipe(gulp.dest('app/'))
	        .on('end', function () {
               done();
            });	
	});
	return gulp;
};