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
      .state('<%= names.single.slug %>', {
        url: '/<%= names.single.slug %>',
        templateUrl: 'app/modules/<%= moduleNames.slug %>/views/<%= names.single.slug %>.view.html'
      });
  }

}).call(this);