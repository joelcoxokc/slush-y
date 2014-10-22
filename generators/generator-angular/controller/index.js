(function(){
  'use strict';

    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */
    module.exports = function(gulp, inquirer, $, _, path){

        var y = this;
        var prompts = require('./prompts.js');
        return gulp.task('controller', this.use(Controller));

        /////////////////////////////

        function Controller( done, options ){

          prompts = this.findModules(prompts);
          return this.ask(prompts, options)
            .then(this.generate(GenerateTemplates))
            .catch(done);
        }


        function GenerateTemplates( options ){
          options = generateControllerName(options);
          gulp.src(options.templateDir + '/**/*')
            .pipe( $.template( options ) )
            .pipe( $.rename( function ( file ) {
                file = y.processFile(true, file, options )
            }))
            .pipe( $.conflict( options.moduleDir ) )
            .pipe( gulp.dest( options.moduleDir ) )

        }

        function generateControllerName(options){
          options.slugModuleName = _str.slugify(options.moduleName);
          console.log(options)
          options.slugControllerName = _str.slugify(_str.humanize(options.name));
          options.classControllerName = _str.classify(options.slugControllerName);
          options.humanizedControllerName = _str.humanize(options.slugControllerName);
          return options;
        }
    }

})();