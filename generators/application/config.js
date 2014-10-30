;(function(){

  'use strict';

    var Configuration =

    Configuration = module.exports = Configuration;

    function Configuration( answers ) {

      var _this = this;

      var storage = _this.storage.get();

      storage.httpType = answers.httpType;
      storage.script = answers.script;
      storage[answers.script] = true;
      storage[answers.httpType] = true;
      storage.app_names = _this.str.simple(storage.appName);

      console.log(storage);


      return storage;






    }

}).call(this);