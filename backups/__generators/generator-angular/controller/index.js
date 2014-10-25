(function(){
  'use strict';

    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */
    module.exports = function(gulp, inquirer, $, _, path, _str){

        var slushy  = this;
        var prompts = require('./prompts.js')(slushy);

        /**
         *  Expose Gulp Task Endpoint, and pass slush.use()
         *  slushy.use() will return a call back to invoke, with the correct context;
         */
        return gulp.task('controller', slushy.task( Controller ));

        /////////////////////////////


        function Controller( done, options ){

          return slushy.ask(prompts, options)
            .then( generateControllerName )
            .then(slushy.generate(GenerateTemplates))
            .catch(done);
        }


        function GenerateTemplates( options ){
          // console.log(options)
          console.log(options.dest().final('controller'))
          // options = generateControllerName(options);
          gulp.src( options.src().scripts() )
            .pipe( $.template( options ) )
            .pipe( $.rename( function ( file ) {
                file = slushy.processFile(true, file, options )
            }))
            .pipe( $.conflict( options.dest().final('controllers') ) )
            .pipe( gulp.dest( options.dest().module( options.moduleName ) ) );

        }

        function generateControllerName(options){
          options.slugModuleName          = _str.slugify(options.moduleName);
          options.slugControllerName      = _str.slugify(_str.humanize(options.name));
          options.classControllerName     = _str.classify(options.slugControllerName);
          options.humanizedControllerName = _str.humanize(options.slugControllerName);
          return options;
        }
    }

})();