(function(){

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var ArticleSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      default: '',
      trim: true,
      required: 'Title cannot be blank'
    },
    content: {
      type: String,
      default: '',
      trim: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  });

  module.exports = mongoose.model('Article', ArticleSchema);
})();