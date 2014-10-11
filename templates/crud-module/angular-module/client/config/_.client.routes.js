;(function(){
'use strict';

  //Setting up route
  angular
    .module('<%= slugifiedPluralName %>')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // <%= humanizedPluralName %> state routing
    $stateProvider.
    state('list<%= classifiedPluralName %>', {
      url: '/<%= slugifiedPluralName %>',
      templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/list-<%= slugifiedPluralName %>.client.view.html'
    }).
    state('create<%= classifiedSingularName %>', {
      url: '/<%= slugifiedPluralName %>/create',
      templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/create-<%= slugifiedSingularName %>.client.view.html'
    }).
    state('view<%= classifiedSingularName %>', {
      url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
      templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/view-<%= slugifiedSingularName %>.client.view.html'
    }).
    state('edit<%= classifiedSingularName %>', {
      url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id/edit',
      templateUrl: 'app/modules/<%= slugifiedPluralName %>/views/edit-<%= slugifiedSingularName %>.client.view.html'
    });
  }
}).call(this);