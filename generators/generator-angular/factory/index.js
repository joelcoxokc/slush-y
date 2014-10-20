(function(){
  'use strict';

  module.exports = function(){

    var controller = require('./controller');

    return Factory;


    //////////////////


    /**
     * 1. Checkout for name argument ... else call done
     * 2. Retrieve all Prompts,
     * 3. bind the prompts to the modules before submitting to inquire submission... before people ask questions
     * 4.
     *
     * @param {Function} done [description]
     */
    function Factory( done ){
      controller
        .argsError(this.args)
        .then(function (data){

        })
    }
  }

})();