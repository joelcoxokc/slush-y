(function(){
  'use strict';

  var fs = require('fs');
  var util = require('util');
  var Slushy = require('../Slushy.js');


module.exports = Modules


    function Modules(){
      Slushy.apply(this, arguments);
    }

    util.inherits(Modules, Slushy);

    Modules.prototype.fetch = function(prompts){

      var moduleFolders  = this.get('modulesFolder');

      // console.log(moduleFolders);

      fs.readdirSync(modulesFolder).forEach(function(folder) {
        var stat = fs.statSync(modulesFolder + '/' + folder);
        if (stat.isDirectory()) {
          prompts[0].choices.push({
            value: folder,
            name: folder
          });
        }
      });

    }

})();