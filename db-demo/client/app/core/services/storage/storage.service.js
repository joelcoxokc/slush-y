;(function(){
'use strict';
  angular
    .module('core')
    .service('$storage', Storage);

  function Storage(){
    this.setObject = function( key, value ){
      if(key === undefined || key === 'undefined') {return;}
      return localStorage.setItem( key, JSON.stringify( value ) );
    };
    this.set = function( key, value ){
      if(key === undefined || key === 'undefined') {return;}
      return localStorage.setItem( key, value);
    };
    this.getObject = function(key){
      var value = localStorage.getItem(key);
      return JSON.parse(value);
    };
    this.get = function(key){
      var value = localStorage.getItem(key);
      return value;
    };
    this.setUser = function(data){
      var token = data.token;
      var user = data.user;
      this.set('user_token', token);
      return this.setObject('user', user);
    };
    this.clear = function(key){
      if(key){
        delete localStorage[key];
        return ;
      }
      localStorage.clear();
      return;
    };
  }

}).call(this);