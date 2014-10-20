module.exports = function (gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp) {
	var fs = require('fs');
	gulp.task('express-test', function (done) {

		if (!this.args[0]) {
			console.log('******    Incorrect usage of the sub-generator!!           ******');
			console.log('******    Try slush meanjs:express-test <model-name>       ******');
			console.log('******    Ex: slush meanjs:express-test article            ******');
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

		var modelFilePath = process.cwd() + '/app/models/' + answers.slugifiedModelName + '.server.model.js';

      	if (!fs.existsSync(modelFilePath)) {
				gulp.src(__dirname + '/../templates/express-test/_.server.model.js')
			        .pipe(template(answers))
			        .pipe(rename(function(file) {
			        	    if (file.basename.indexOf('_') == 0) {
		                        file.basename = file.basename.replace('_', answers.slugifiedModelName);
		                    }
		             }))
			        .pipe(conflict('app/models/'))
			        .pipe(gulp.dest('app/models/'));	
			}

			gulp.src(__dirname + '/../templates/express-test/_.server.model.test.js')
		        .pipe(template(answers))
		        .pipe(rename(function(file) {
		        	    if (file.basename.indexOf('_') == 0) {
	                        file.basename = file.basename.replace('_', answers.slugifiedModelName);
	                    }
	             }))
		        .pipe(conflict('app/tests/'))
		        .pipe(gulp.dest('app/tests/'))
		        .on('end', function () {
	               done();
	            });	
	});
	return gulp;
};