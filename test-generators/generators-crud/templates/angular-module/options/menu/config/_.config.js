;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('<%= slugifiedPluralName %>')
    .config( Config );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('<%= menuId %>', '<%= humanizedPluralName %>', '<%= slugifiedPluralName %>');
    Menus.addMenuItem('<%= menuId %>', 'New <%= humanizedSingularName %>', '<%= slugifiedPluralName %>/create');
  }

}).call(this);