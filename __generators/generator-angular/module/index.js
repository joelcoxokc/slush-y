(function(){
  'use strict';


  module.exports = function (gulp, inquirer, $, _, path) {

    var slushy    = this;
    var prompts   = require('./prompts.js')

    return gulp.task('module', slushy.task(Module));


    ////////////////////////////////////

    function Module( done, options ){

      prompts = prompts(options);

      return slushy.ask( prompts, options )
        .then( setModuleName )
        .then(slushy.generate( GenerateTemplates ) )
        .catch( done )

    }


    /**
     * Generate Templates
     * @param {Object} options Contains the moduleName with multiple string versions
     *                         Also contains an array of chosen foders the user has selected
     */
    function GenerateTemplates(options){
      /**
       * Generate Directories based on users selection
       * @param  {String} moduleDir ./client/app/modules
       * @param  {String} options.slugifiedName example = 'Testing' = testing
       */
      _(options.folders).forEach(function (item){
        slushy.info('creating', slushy.path(options.moduleDir, item))
        slushy.mkdir(path.join( options.moduleDir, item));
      })

      gulp
        .src( options.src().scripts() )
        .pipe($.template(options))
        .pipe($.rename(function (file){
          slushy.info(file)
          file = slushy.processFile(true, file, options );
        }))
        .pipe(gulp.dest( options.dest().modules( options.moduleName ) ));

    }

    function setModuleName( options ){
      options.moduleName = options.name;
      return options;
    }

  }
})();