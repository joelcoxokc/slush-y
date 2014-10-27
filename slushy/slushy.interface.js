;(function(){
    'use strict';

      var Slushy  = require('./_Slushy');
      var util    = require('util');


      var Slushy_interface = module.exports =  function Slushy_interface (){

        Slushy.apply( this, arguments );
      };

      util.inherits( Slushy_interface, Slushy );

      /**
       * Used as a middleware helper for the .then() promises, inorder to pass params in. Also allows us to call it with a specific context
       *
       * @param  {Function}  callback [the callback function from the promise. ]
       * @param  {Object}    options  [options is an empty object at first, and begins to grow as the it is passed around]
       * @return {Promise}            [Return a promise to pick up on the next chain]
       */
      Slushy_interface.prototype.use          = function ( callback, options ) {

        return callback.apply( this, arguments );
      };

      Slushy_interface.prototype.validate = function ( options ) {

        return this.startValidation( options );
      };

      /*
       * Initialize the promise chain and pass in the initial options
       */
      Slushy_interface.prototype.flow         = function ( options ) {

        return this.startFlow( options );
      };

      /**
       * [defaults Check if the generator is running default, if so, initialize configuration after prompt]
       * @param  {Object}   options   [options object, this object is modified every step until the end.]
       * @return {Promise}            [returns a promise to pick up on the next chain]
       */
      Slushy_interface.prototype.defaults      = function ( options ) {

        return this.startDefaults( options );
      };

      /**
       * [prompts prompt th user using inquire]
       * @param  {Object}   options   [options should contain a property {prompts} a list of prompts to pass into inquire]
       * @return {Promise}            [Return a promise for the next chain]
       */
      Slushy_interface.prototype.prompts       = function ( options ) {

        return this.startPrompts( options );
      };
      /**
       * [Configuration Initialize the config store if this is a new instance, otherwise, ignore and pass throguh]
       * @param  {Object}   options   [options should now contain a property call {answers} a list of all the users choices]
       * @return {Promise}            [return a promise for the next chain]
       */
      Slushy_interface.prototype.configuration = function ( options ) {

        return this.startConfiguration( options );
      };

      /**
       * filter generate filters for templating
       * @param  {Object} options Streamed options object
       * @return {Object}         Return modified form of options
       */
      Slushy_interface.prototype.filter        = function ( options ) {

        return this.createFilters( options );
      };

      /**
       * paths generate paths or selecting templates for source and destination.
       * @param  {Object} options Original streamed options.
       * @return {Object}         Return modified verision of the options object
       */
      Slushy_interface.prototype.paths = function ( options ) {

        return this.createPaths( options );
      };

      Slushy_interface.prototype.registration = function ( ) {

        return this.register;
      };

}).call(this);