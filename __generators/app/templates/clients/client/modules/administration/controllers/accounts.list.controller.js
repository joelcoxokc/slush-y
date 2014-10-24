;(function(){
  'use strict';
  angular
    .module('administration')
    .controller('AccountsController', AccountsController);

  /* @inject */
  function AccountsController(resolvedAccounts, $scope, User, Auth, $state, logger) {
    var vm = this;

    vm.accounts = resolvedAccounts;
    console.log(vm.accounts)
    //////////////////////
  }

}).call(this);