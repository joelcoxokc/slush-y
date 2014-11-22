(function(){
  'use strict';

    /**
     * Broadcast updates to client when the model changes
     */

    var person = require('./person.model');
    exports.register = function(socket) {
      person.schema.post('save', function (doc) {
        onSave(socket, doc);
      });
      person.schema.post('remove', function (doc) {
        onRemove(socket, doc);
      });
    }

    function onSave(socket, doc, cb) {
      socket.emit('people:save', doc);
    }

    function onRemove(socket, doc, cb) {
      socket.emit('people:remove', doc);
    }

})();