;(function(){
/* global io */
'use strict';

  angular
    .module('core')
    .factory('socket', socketService);
    socketService.$inject = ['socketFactory','serverBaseUrl'];
    function socketService(socketFactory,serverBaseUrl) {

      // socket.io now auto-configures its connection when we ommit a connection url
      var ioSocket = io(serverBaseUrl, {
        // Send auth token on connection, you will need to DI the Auth service above
        // 'query': 'token=' + Auth.getToken()
        path: '/socket.io-client'
      });

      var socket = socketFactory({
        ioSocket: ioSocket
      });

      return {
        socket: socket,

        /**
         * Register listeners to sync an array with updates on a model
         *
         * Takes the array we want to sync, the model name that socket updates are sent from,
         * and an optional callback function after new items are updated.
         *
         * @param {String} modelName
         * @param {Array} array
         * @param {Function} cb
         */
        syncUpdates: function (modelName, collection, callback) {
          callback = callback || angular.noop;

          /**
           * Syncs item creation/updates on 'model:save'
           */
          socket.on(modelName + ':save', function (item) {
            var index = _.findIndex(collection, {_id: item._id});
            var oldItem = collection[index] || null;
            var event = 'created';


            // replace oldItem if it exists
            // otherwise just add item to the collection
            if (oldItem) {
              collection.splice(index, 1, item);
              event = 'updated';
            } else {
              var scope = collection.push(item);
              // var readyScope = collection.call('push', item);
              return callback(event, item, scope);
            }

            callback(event, item, collection);
          });

          /**
           * Syncs removed items on 'model:remove'
           */
          socket.on(modelName + ':remove', function (item) {
            var event = 'deleted';
            _.remove(collection, {_id: item._id});
            callback(event, item, collection);
          });
        },

        /**
         * Removes listeners for a models updates on the socket
         *
         * @param modelName
         */
        unsyncUpdates: function (modelName) {
          socket.removeAllListeners(modelName + ':save');
          socket.removeAllListeners(modelName + ':remove');
        }
      };
    }
}).call(this);