/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var user = require('./user.model');
exports.register = function(socket) {
  user.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  user.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('users:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('users:remove', doc);
}