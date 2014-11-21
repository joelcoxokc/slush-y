;(function(){
'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.plural.classed %>', <%= names.plural.classed %>);

    /* @inject */
    function <%= names.plural.classed %>($http, serverUrl, $q, logger) {
      // Define Private Variables
      var api = createUrl(serverUrl, '<%= names.plural.camel %>');

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
        return $http.post( api, data )
          .then( function (response){
            logger.logSuccess('<%= names.plural.classed %> Saved');
            return response.data;
          })
          .catch( function (err){
            logger.logError('Error Saving');
            return err;
          });
      }
      function update ( id, data ){
        return $http.put( createUrl( api, id ), data )
          .then( function (response){
            logger.logSuccess('<%= names.single.classed %> Updated Successfully');
            return response.data;
          })
          .catch( function (err){
            logger.logError('Error Saving');
            return err
          });
      }
      function destroy ( id ){
        return $http.delete( createUrl( api, id ) )
          .then( function (response){
            logger.logSuccess('Successfully Deleted');
            return response.data;
          })
          .catch( function (err){
            logger.logError('Error Deleting');
            return err;
          });
      }
      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }
    }

}).call(this);
