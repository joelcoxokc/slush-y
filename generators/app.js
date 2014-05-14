module.exports = function(gulp, install, conflict, template, rename, _, inquirer){
	gulp.task('default', function (done) {
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
	            type: 'confirm',
	            name: 'addArticleExample',
	            message: 'Would you like to generate the article example CRUD module?',
	            default: true
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
	            answers.slugifiedAppName = _.slugify(answers.appName);
	            answers.humanizedAppName = _.humanize(answers.appName);
	            answers.capitalizedAppAuthor = _.capitalize(answers.appAuthor);
	            answers.angularCookies = _.contains(answers.modules, 'angularCookies');
	            answers.angularAnimate = _.contains(answers.modules, 'angularAnimate');
	            answers.angularTouch = _.contains(answers.modules, 'angularTouch');
	            answers.angularSanitize = _.contains(answers.modules, 'angularSanitize');
	            gulp.src(__dirname + '/../templates/app/static/**')
	                .pipe(rename(function(file) {
	                        if (file.basename.indexOf('__') == 0) {
	                            file.basename = '.' + file.basename.slice(2);
	                        }
	                 }))
	                .pipe(conflict('./'))
	                .pipe(gulp.dest('./'));
	            
	            if(answers.addArticleExample)
	            {
	                gulp.src(__dirname + '/../templates/app/article/**')
	                    .pipe(conflict('./'))
	                    .pipe(gulp.dest('./'));
	            }

	            gulp.src(__dirname + '/../templates/app/dynamic/**')
	                .pipe(template(answers))
	                .pipe(conflict('./'))
	                .pipe(gulp.dest('./'))
	                .pipe(install())
	                .on('end', function () {
	                    done();
	                });
	        });
	});
	return gulp;
}