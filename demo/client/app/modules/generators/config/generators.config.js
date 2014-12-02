;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('generators')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('Generators', '/generators', 'blue-500');
  }

}).call(this);