(function(){
  'use strict';


  module.exports = function (gulp, inquirer, $, _, path) {

    this.log('Registered  ['+this.green('sub-generator')+']:' + this.green( 'module' ))

    var y = this;
    var prompts       = require('./prompts.js')

    // gulp.task('module:default', y.use(Module))
    return gulp.task('module',  this.use(Module));


    ////////////////////////////////////

    function Module( done, options ){
      console.log(options)
      prompts = prompts(options);
      return this.ask(prompts, options)
        .then(this.generate(GenerateTemplates))

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
        y.info('creating', y.path(options.moduleDir, item))
        y.mkdir(path.join( options.moduleDir, item));
      })

      gulp
        .src(options.temlpatesDir + '/*.js')
        .pipe($.template(options))
        .pipe($.rename(function (file){
          y.info(file)
          file = y.processFile(true, file, options );
        }))
        .pipe(gulp.dest( options.moduleDir ));

    }

  }
})();