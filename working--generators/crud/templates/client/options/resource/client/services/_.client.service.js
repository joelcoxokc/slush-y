;(function(){
'use strict';
  //<%= humanizedPluralName %> service used to communicate <%= humanizedPluralName %> REST endpoints
  angular
    .module('<%= slugifiedPluralName %>')
    .factory('<%= classifiedPluralName %>', <%= classifiedPluralName %>);

    /* @inject */
    function <%= classifiedPluralName %>($resource) {
      return $resource('api/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', {
          <%= camelizedSingularName %>Id: '@_id'
      }, {
          update: {
              method: 'PUT'
          }
      });
    }
}).call(this);