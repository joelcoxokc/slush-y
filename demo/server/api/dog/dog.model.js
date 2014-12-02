(function(){

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var DogSchema = new Schema({
    
    name: {
      type: String,
      default: ''
    },
     age: {
      type: Number,
      default: ''
    },
     phone: {
      type: String,
      default: ''
    },
    // user: {
    //   type: Schema.ObjectId,
    //   ref: 'User'
    // }
  });

  module.exports = mongoose.model('Dog', DogSchema);
})();