(function(){
  'use strict';

    /**
     * Broadcast updates to client when the model changes
     */

    var dog = require('./dog.model');
    exports.register = function(socket) {
      dog.schema.post('save', function (doc) {
        onSave(socket, doc);
      });
      dog.schema.post('remove', function (doc) {
        onRemove(socket, doc);
      });
    }

    function onSave(socket, doc, cb) {
      socket.emit('dogs:save', doc);
    }

    function onRemove(socket, doc, cb) {
      socket.emit('dogs:remove', doc);
    }

})();