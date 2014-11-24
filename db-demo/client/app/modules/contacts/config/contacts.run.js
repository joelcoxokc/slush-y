;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('contacts')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('Contacts', '/contacts', 'grey-500');
  }

}).call(this);