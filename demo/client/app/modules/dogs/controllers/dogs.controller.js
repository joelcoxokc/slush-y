;(function(){
  'use strict';

  angular
    .module('dogs')
    .controller('DogsController', DogsController);

  /* @inject */
  function DogsController($scope,things,people,me) {
    // Dogs controller logic

    $scope.val = 0;
    
    $scope.create = create;
    $scope.update = update;
    $scope.destroy = destroy;

    //////////////////
    
    /*
     * create      description
     * @return {[type]} description
     *
     */
    function create() {}
    
    /*
     * update      description
     * @return {[type]} description
     *
     */
    function update() {}
    
    /*
     * destroy      description
     * @return {[type]} description
     *
     */
    function destroy() {}
    

  }
}).call(this);
