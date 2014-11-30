;(function(){
'use strict';
  //<%= names.plural.humanized %> service used to communicate <%= names.plural.humanized %> REST endpoints
  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.plural.classed %>', <%= names.plural.classed %>);

    /* @inject */
    function <%= names.plural.classed %>(Restangular) {
      return Restangular.service('<%= names.plural.slug %>');
    }
}).call(this);