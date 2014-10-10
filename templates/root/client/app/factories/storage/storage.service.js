;(function(){
'use strict';
angular.module('yoSoaApp').service('$storage', Storage);

  function Storage(){
    this.set = function( key, value ){
      if(key === undefined || key === 'undefined') {return;}
      return localStorage.setItem( key, JSON.stringify( value ) );
    };
    this.get = function(key){
      var value = localStorage.getItem(key);
      return JSON.parse(value);
    };
    this.clear = function(key){
      if(key){
        delete localStorage[key];
        return ;
      }
      localStorage.clear();
      return
    };
  }

}).call(this);