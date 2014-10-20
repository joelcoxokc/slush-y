(function(){
  'use strict';


    module.exports = function () {

        var gulp          = require('gulp');
        var fs            = require('fs');
        var _             = require('lodash');
        var path          = require('path');
        var prompts       = require('./prompts.js')
        var controller    = require('./controller.js');


        console.log(_.functions(controller))
        return Module;

        ////////////////////////////////////

        function Module( done ){
          controller
            .handleErrors( this.args )
            .then( controller.getModules )
            .catch(done)
        }
    }
})();