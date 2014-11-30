;(function(){
  'use strict';
  angular
    .module('administration')
    .controller('AccountsController', AccountsController);

  /* @inject */
  function AccountsController(resolvedAccounts, $scope, User, Auth, $state, logger) {
    var vm = this;

    vm.accounts = resolvedAccounts;
    //////////////////////
  }

}).call(this);