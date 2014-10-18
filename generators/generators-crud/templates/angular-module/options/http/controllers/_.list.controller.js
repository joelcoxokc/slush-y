;(function(){
'use strict';

  // <%= humanizedPluralName %> controller
  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>Controller', <%= classifiedPluralName %>Controller);

  /* @inject */
  function <%= classifiedPluralName %>Controller(resolvedList, $scope, $stateParams, $state, <%= classifiedPluralName %>, logger) {

    $scope.find = find;
    $scope.findOne = findOne;
    $scope.<%= camelizedPluralName %> = resolvedList;


    var vm = this;
    vm.<%= camelizedPluralName %> = resolvedList;
    vm.show<%= camelizedPluralName %> = show<%= camelizedPluralName %>;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('<%= camelizedPluralName %>', vm.<%= camelizedPluralName %>);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.articleId)
      return $state.includes('<%= camelizedPluralName %>', {<%= camelizedPluralName %>Id: state});
    }

    // show <%= humanizedPluralName %>
    function showArticle(<%= camelizedSingularName %>){
        if(article._id === vm.shown._id){
          $state.go('<%= camelizedPluralName %>');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('<%= cam-lizedPluralName %>.detail', {<%= camelizedPluralName %>Id: <%= camelizedPluralName %>._id});
          vm.shown = article;
          // vm.showDetail = true;
        }
    }
    /*
        Event emitted from child states.
     */
    $scope.$on('child:closed', function ( event ){
      vm.shown = {};
      vm.showDetail = false;
    });
    $scope.$on('child:opened', function ( event ){
      vm.shown = {};
      vm.showDetail = true;
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('articles');
    });
  }
}).call(this);