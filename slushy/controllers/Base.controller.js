;(function(){

  'use strict';

    var _ = require('lodash');
    var Q = require('Q');
    var inquirer  = require('inquirer');
    var prompting = require('../../test-generators/app/prompts');



    var Base = module.exports;
    Base.controller = {
      checkForDefault: checkForDefault,
      filterStream: filterStream,
      isRunning: isRunning,
      ask: ask,
    }



    ///////////////////////////////////


    function isRunning(args){
      // this.log('Running  ['+this.blueB('sub-generator')+']:' + this.blueB( generator.name ));
      var generator = _(args).filter(function (value){ return value.running && value.running !== undefined }).value()[0];
      return generator;
    }

    function filterStream(__slushy_stream){
      var __this = this;
      this.show('filteringStream')
      // console.log(__slushy_stream);
      if(__slushy_stream.generator.generator.name === 'default'){
        return __this.initConfig(__slushy_stream);
      } else {
        return __slushy_stream

      }

    }

    function checkForDefault(){

    }
    function ask(__slushy_stream){
      var $promised = Q.defer();
      console.log('prompting')
      /**
       * Add an aswers property to the stream, so we can _.assign it.
       * @type {Object}
       */
      var prompts = __slushy_stream.prompts
      __slushy_stream.answers = {};
      inquirer.prompt(__slushy_stream.prompts, function (answers){
        _.assign(__slushy_stream.answers, answers)

        $promised.resolve(__slushy_stream);

      })

      return $promised.promise;
    }


}).call(this);



