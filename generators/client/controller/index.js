(function(){
  'use strict';

    var _    = require('lodash');
    var path = require('path');
    var gulp = require('gulp');
    /**
     * Controller Bound to the Slushy Prototype;
     * @return {Function} Callback function for the Controller Task to Call
     */


    module.exports = function ( $, paths, filters, templates, slushy) {

      var __this = this;

      setDefaults();
      generate();

      /////////////////////

      function generate(){
        gulp.src( templates.base.all() )
          .pipe( $.template( filters ) )
          .pipe( $.rename( __this.files().rename(filters.names.single.slug) ) )
          .pipe( $.conflict( paths.dest ))
          .pipe( gulp.dest( paths.dest  ))
      }

      function setDefaults(){

        if(!_.contains(filters.providers, '$scope') ){
          filters.providers.push('$scope');
        }

        if( _.isEmpty( filters.functions ) ){
          filters.functions = ['create', 'update', 'destroy'];
        }
      }

    };


})();
