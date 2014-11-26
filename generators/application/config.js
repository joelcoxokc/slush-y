;(function(){

  'use strict';

    var _ = require('lodash')

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
            storage[stream.answers.script] = true;
            storage[stream.answers.httpType] = true;
            _.assign(storage, stream.answers)
            storage.app_names = _this.str().simple(storage.appName);

            storage.restangular = false;

        this.storage.store( storage );

        stream.filters = storage;
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







