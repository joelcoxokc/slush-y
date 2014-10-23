;(function(){
    'use strict';

      // var Slushy  = require('./Slushy.js');
      var util    = require('util');


      var Slush_y = module.exports =  function Slush_y (){

        // Slushy.apply( this, arguments );
      };

      // util.inherits( Slush_y, Slushy );


      /*
       * Initialize the promise chain and pass in the initial options
       */
      Slush_y.prototype.startFlow         = function ( options ) {

        return options.flow = ' -- start flow endpoint reached';
      }

      /**
       * [defaults Check if the generator is running default, if so, initialize configuration after prompt]
       * @param  {Object}   options   [options object, this object is modified every step until the end.]
       * @return {Promise}            [returns a promise to pick up on the next chain]
       */
      Slush_y.prototype.startDefaults      = function ( options ) {

        return options.defaults = ' -- start defaults endpoint reached';
      }

      /**
       * [prompts prompt th user using inquire]
       * @param  {Object}   options   [options should contain a property {prompts} a list of prompts to pass into inquire]
       * @return {Promise}            [Return a promise for the next chain]
       */
      Slush_y.prototype.startPrompts       = function ( options ) {

        return options.prompts = ' -- start prompts endpoint reached';
      }
      /**
       * [Configuration Initialize the config store if this is a new instance, otherwise, ignore and pass throguh]
       * @param  {Object}   options   [options should now contain a property call {answers} a list of all the users choices]
       * @return {Promise}            [return a promise for the next chain]
       */
      Slush_y.prototype.startConfiguration = function ( options ) {

        return options.configuration = ' -- start configuration endpoint reached';
      }

      /**
       * [source this will create ans add all source and destinatino path selectios for the generator to do it's job.]
       * @param  {Object}   options   [Options should contain the same informatino as before, as we did not modify it in configuration]
       * @return {Promise}            [Return a promise for the next chain]
       */
      Slush_y.prototype.startSource        = function ( options ) {

        return options.source = ' -- start source endpoint reached';
      }

      Slush_y.prototype.registration = function ( ) {

        return this.register;
      }

}).call(this);