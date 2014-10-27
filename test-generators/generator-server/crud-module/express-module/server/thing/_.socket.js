/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var <%= camelizedSingularName %> = require('./<%= camelizedSingularName %>.model');
exports.register = function(socket) {
  <%= camelizedSingularName %>.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  <%= camelizedSingularName %>.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('<%= camelizedPluralName %>:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('<%= camelizedPluralName %>:remove', doc);
}