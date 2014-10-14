;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('generators')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Generators', 'generators');
    Menus.addMenuItem('topbar', 'New Generator', 'generators/create');
  }

}).call(this);