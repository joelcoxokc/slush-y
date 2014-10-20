;(function(){
'use strict';

  angular
    .module('core')
    .factory('Thing', Thing);
    /* @inject */
    function Thing($http, serverUrl, $q, logger) {
      // Define Private Variables

      var api = createUrl( serverUrl, 'things' )

      // Define the public api
      var instance = {
        all: all,
        one: one,
        create: create,
        update: update,
        destroy: destroy
      };
      return instance;

      ////////////////

      function all (){
        return $http.get( api );
      }
      function one ( id ){
        return $http.get( createUrl( api, id ) );
      }
      function create ( data ){
        var q = $q.defer();
        $http
          .post( api, data )
          .then( function (data){
            logger.logSuccess('Thing Saved');
            q.resolve( data );
          })
          .catch( function (err){
            logger.logError('Error Saving data');
            q.reject(err);
          });
        return q.promise;
      }
      function update ( id, data ){
        var q = $q.defer();
        $http
          .put( createUrl( api, id ), data )
          .then( function (data){
            logger.logSuccess('Saved Successfully');
            q.resolve( data );
          })
          .catch( function (err){
            logger.logError('Error Saving');
            q.reject(err);
          });
        return q.promise;
      }
      function destroy ( id ){
        var q = $q.defer();
        $http
          .delete( createUrl( api, id ) )
          .then( function (data){
            logger.logSuccess('Successfully Deleted');
            q.resolve( data );
          })
          .catch( function (err){
            logger.logError('Error Deleting');
            q.reject(err);
          });
        return q.promise;
      }
      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }
    }

}).call(this);
