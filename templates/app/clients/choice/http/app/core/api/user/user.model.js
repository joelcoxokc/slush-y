;(function(){
'use strict';

  angular
    .module('core')
    .factory('User', User);
    /* @inject */
    function User($http, serverUrl, $q, logger) {
      // Define Private Variables

      var api = [serverUrl, 'users'].join('/');

      // Define the public api
      var instance = {
        all: all,
        one: one,
        create: create,
        update: update,
        destroy: destroy,
        changePassword: changePassword
      };
      return instance;

      ////////////////

      function all (){
        return $http.get( api );
      }
      function one ( id ){
        return $http.get( api, {id: id} );
      }
      function create ( data ){
        var q = $q.defer();
        $http
          .post( api, data )
          .then( function (data){
            logger.logSuccess('User Saved');
            q.resolve( data );
          })
          .catch( function (err){
            logger.logError('Error Saving data');
            q.reject(err);
          });
        return q.promise;
      }
      function update ( id, data ){
        var url = [api, id].join('/');
        var q = $q.defer();
        $http
          .put( url, data )
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
          .delete( api + '/' + id )
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
      function changePassword( id, data ){
        var url = [api,id,'password'].join('/')
        var q = $q.defer();
        $http
          .put( url, data )
          .then( function (data){
            logger.logSuccess('Password Successfully Changed');
            q.resolve( data );
          })
          .catch( function (err){
            logger.logError('Error changing password');
            q.reject(err);
          });
        return q.promise;
      }
    }

}).call(this);
