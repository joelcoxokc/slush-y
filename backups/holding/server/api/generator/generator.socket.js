/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var generator = require('./generator.model');
exports.register = function(socket) {
  generator.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  generator.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('generators:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('generators:remove', doc);
}