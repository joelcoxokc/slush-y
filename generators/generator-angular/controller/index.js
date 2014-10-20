(function(){
  'use strict';

    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */
    module.exports = function(){

        var y = this;
        var fs = require('fs');
        var moduleName = this.args[0];
        var modulesDir = y.get('modulesDir');
        var prompts = require('/prompts.js');
        var templateDir = __dirname + '/templates/';
        var controller = require('./controller.js');


        return Controller;

        /////////////////////////////

        function Controller( done ){
          if (!this.args[0]) {
            return done();
          }

          return controller.getCurrentModules( prompts, modulesDir)
            .then( controller.ask )
            .then( GenerateTemplates )
            .catch( done )

        }


        function GenerateTemplates( answers ){

          gulp.src(templateDir + '**')
            .pipe( g.template( answers ) )
            .pipe( g.rename( function ( file ) {
                file = controller.proccessFile( file, answers )
            }))
            .pipe( g.conflict('client/app/modules/' + answers.slugifiedModuleName ) )
            .pipe( gulp.dest('client/app/modules/' + answers.slugifiedModuleName ) )

        }
    }

})();