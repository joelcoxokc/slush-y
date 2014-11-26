;(function(){

  'use strict';

    var _ = require('lodash');
    var path = require('path');

    var Config = module.exports;
        Config.initialize  = initialize;
        // Config.base        = base;
        // Config.options     = options;

    /**
     * initialize       Main application configuration
     *                  set default config store values.
     *                  The initialize function will be invoked for you.
     *                  Everything else from the file must be invoke yourself.
     * @param  {Object} answers  Answers from initail prompting.
     * @return {Object} return Storage for usage later;
     */

    function initialize (stream) {
        var _this = this;
        var storage = this.storage.get();

        storage.moduleNames = _this.str().multi(stream.answers.module);

        storage.names       = _this.str().multi(_this.title);

        _this.modulePath = path.join( _this.dirs.modules, storage.moduleNames.slug );

        _.assign( storage, stream.answers );

        _.assign( storage, _this.flags );

        stream.filters = storage;


        if( _.isEmpty( stream.filters.functions ) ){
          stream.filters.functions = ['one', 'two', 'three'];
        }

        return stream;
    }

    /**
     * [generators description]
     * @return {[type]} [description]
     */
    function base (stream) { return stream; }

    /**
     * [subGenerators description]
     * @return {[type]} [description]
     */
    function options (stream) {return stream; }



}).call(this);







