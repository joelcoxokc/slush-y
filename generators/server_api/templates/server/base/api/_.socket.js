(function(){
  'use strict';

    /**
     * Broadcast updates to client when the model changes
     */

    var <%= names.single.camel %> = require('./<%= names.single.slug %>.model');
    exports.register = function(socket) {
      <%= names.single.camel %>.schema.post('save', function (doc) {
        onSave(socket, doc);
      });
      <%= names.single.camel %>.schema.post('remove', function (doc) {
        onRemove(socket, doc);
      });
    }

    function onSave(socket, doc, cb) {
      socket.emit('<%= names.plural.camel %>:save', doc);
    }

    function onRemove(socket, doc, cb) {
      socket.emit('<%= names.plural.camel %>:remove', doc);
    }

})();