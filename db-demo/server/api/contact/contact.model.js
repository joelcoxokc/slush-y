(function(){

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var ContactSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    firstName: {
      type: String,
      default: '',
      trim: true,
      required: 'Title cannot be blank'
    },
    lastName: {
      type: String,
      default: '',
      trim: true
    },
    email: {
      type: String,
      default: '',
      trim: true
    },
    phone: {
      type: String,
      default: '',
      trim: true
    },

  });

  module.exports = mongoose.model('Contact', ContactSchema);
})();