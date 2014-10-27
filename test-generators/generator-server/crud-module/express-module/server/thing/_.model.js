'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var <%= classifiedSingularName %>Schema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('<%= classifiedSingularName %>', <%= classifiedSingularName %>Schema);