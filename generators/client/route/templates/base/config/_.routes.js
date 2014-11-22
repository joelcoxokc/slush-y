;(function(){
  'use strict';
  //Setting up route
  angular
    .module('<%= moduleNames.slug %>')
    .config( <%= names.single.classed %> );

  /* @inject */
  function <%= names.single.classed %>($stateProvider) {
    // <%= moduleNames.slug %> state routing
    $stateProvider
      .state('<%= names.plural.slug %>', {
        url: '/<%= names.plural.slug %>',
        templateUrl: 'app/modules/<%= moduleNames.slug %>/views/<%= names.plural.slug %>.view.html'
      });
  }

}).call(this);