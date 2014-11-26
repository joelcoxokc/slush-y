;(function(){
  'use strict';
  //Setting up route
  angular
    .module('<%= moduleNames.slug %>')
    .config( <%= names.classed %> );

  /* @inject */
  function <%= names.classed %>($stateProvider) {
    // <%= moduleNames.slug %> state routing
    $stateProvider
      .state('<%= names.slug %>', {
        url: '/<%= names.slug %>',
        templateUrl: 'app/modules/<%= moduleNames.slug %>/views/<%= names.slug %>.view.html'
      });
  }

}).call(this);