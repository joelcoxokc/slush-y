;(function(){
  'use strict';
  // Configuring the Articles module
  angular
    .module('<%= moduleNames.slug %>')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.set('<%= names.classed %>', '/<%=names.slug %>', 'grey-500');
  }

}).call(this);