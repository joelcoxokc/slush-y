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
        storage.moduleNames = _this.str().multi(stream.answers.moduleName);
        _.assign(storage, stream.answers)
        _this.modulePath = path.join( _this.dirs.modules, _this.title );
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







