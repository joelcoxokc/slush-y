;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('people')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('people', '/people', 'grey-500');
  }

}).call(this);