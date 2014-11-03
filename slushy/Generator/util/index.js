;(function(){

  var fs = require('fs');
  var path = require('path');
  'use strict';

    var Utility = module.exports;
        Utility.findModules = findModules;


        function findModules(prompts){
          // console.log(modules);
          var modulesDir = path.join(process.cwd(), 'client', 'app', 'modules');
          readModules();
          return prompts;
          function readModules(){
            fs.readdirSync(modulesDir).forEach(function (folder) {

              var stat = fs.statSync(modulesDir + '/' + folder);

              if (stat.isDirectory()) {
                prompts[0].choices.push({
                  value: folder,
                  name: folder
                });
              }
            });
          }
        }

}).call(this);