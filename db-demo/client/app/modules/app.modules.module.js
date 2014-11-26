;(function(){
'use strict';


  window.modules = [
      'authentication',
      'administration'
  ]
  window.ModuleGenerator = ModuleGenerator;
  window.Application = ModuleGenerator();

  function ModuleGenerator(){

    window.AppModule = angular.module('app.modules', window.modules);
    return {
      register:register
    };

    function register(module){
      angular.module(module, []);
      window.modules.push(module);
    }
  }



}).call(this);