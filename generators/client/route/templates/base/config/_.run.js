;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('<%= moduleNames.slug %>')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('<%= moduleNames.slug %>', '/<%=names.plural.slug %>', 'grey-500');
  }

}).call(this);