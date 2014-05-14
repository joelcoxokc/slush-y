module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
	var fs = require('fs');
	gulp.task('express-model', function (done) {

		if (!this.args[0]) {
			console.log('******    Incorrect usage of the sub-generator!!           ******');
			console.log('******    Try slush meanjs:express-model <model-name>      ******');
			console.log('******    Ex: slush meanjs:express-model article           ******');
			return done();
		}
		var moduleName = this.args[0];
		// Set model names
		var answers = {};
        answers.slugifiedModelName = _.slugify(_.humanize(moduleName));
        answers.classifiedModelName = _.classify(answers.slugifiedModelName);
        answers.humanizedModelName = _.humanize(answers.slugifiedModelName);
        answers.camelizedModelName = _.camelize(answers.slugifiedModelName);
        answers.slugifiedPluralModelName = inflections.pluralize(answers.slugifiedModelName);

        gulp.src(__dirname + '/../templates/express-model/**')
	        .pipe(template(answers))
	        .pipe(rename(function(file) {
        	    if (file.basename.indexOf('_') == 0) {
                    file.basename = file.basename.replace('_', answers.slugifiedModelName);
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