;(function(){
    'use strict';

    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

    /**
     * [Schema <%= names.single.classed %> Schema]
     * @type {Schema}
     */
    var <%= names.single.classed %>Schema = new Schema({
      // <%= names.single.classed %> model fields
      // ...
    });

    module.exports = mongoose.model('<%= names.single.classed %>', <%= names.single.classed %>Schema);


}).call(this);