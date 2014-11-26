'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FolderSchema = new Schema({
  title: String,
  name: String,
  dir: { type: Boolean, default: true },
  extension: String,
  info: String,
  active: { type: Boolean, default: true },
  children: [FolderSchema]
})

var GeneratorSchema = new Schema({
  title: String,
  type: Array,
  command: String,
  example: String,
  info: Array,
  client_files: [FolderSchema],
  server_files: [FolderSchema],
  active: Boolean,
  position: Number,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Generator', GeneratorSchema);