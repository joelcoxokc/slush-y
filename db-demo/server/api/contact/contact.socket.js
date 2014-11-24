(function(){
  'use strict';

    /**
     * Broadcast updates to client when the model changes
     */

    var contact = require('./contact.model');
    exports.register = function(socket) {
      contact.schema.post('save', function (doc) {
        onSave(socket, doc);
      });
      contact.schema.post('remove', function (doc) {
        onRemove(socket, doc);
      });
    }

    function onSave(socket, doc, cb) {
      socket.emit('contacts:save', doc);
    }

    function onRemove(socket, doc, cb) {
      socket.emit('contacts:remove', doc);
    }

})();