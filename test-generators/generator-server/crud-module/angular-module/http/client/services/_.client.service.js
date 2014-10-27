;(function(){
'use strict';

  angular
    .module('core')
    .factory('<%= classifiedPluralName %>', <%= classifiedPluralName %>);
    /* @inject */
    function <%= classifiedPluralName %>($http, serverUrl, $q, logger) {
      // Define Private Variables
      var api = [serverUrl,'<%= camelizedPluralName %>'].join('/')
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
        return $http.get( createUrl( api, id) );
      }
      function create ( data ){
        var q = $q.defer();
        $http
          .post( api, data )
          .then( function (data){
            logger.logSuccess('<%= classifiedPluralName %> Saved');
            q.resolve( data );
          })
          .catch( function (err){
            logger.logError('Error Saving');
            q.reject(err);
          });
        return q.promise;
      }
      function update ( id, data ){
        var q = $q.defer();
        $http
          .put( createUrl( api, id ), data )
          .then( function (data){
            logger.logSuccess('<%= classifiedSingularName %> Updated Successfully');
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
