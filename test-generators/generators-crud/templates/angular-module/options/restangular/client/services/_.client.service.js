;(function(){
'use strict';
  //<%= humanizedPluralName %> service used to communicate <%= humanizedPluralName %> REST endpoints
  angular
    .module('<%= slugifiedPluralName %>')
    .factory('<%= classifiedPluralName %>', <%= classifiedPluralName %>);

    /* @inject */
    function <%= classifiedPluralName %>(Restangular) {
      return Restangular.service('<%= slugifiedPluralName %>');
    }
}).call(this);