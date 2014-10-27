;(function(){

  'use strict';

  var fs = require('fs');


  var Actions               = module.exports;
      Actions.findModules   = findModules;
      Actions.Dirs          = Dirs;
      // Actions.use           = use;

  /**
   * Actions.use() is used as Slushy.use()
   * Inorder to bind this to the gulp task, we can use the 'use' function
   * @param  {Callback} callback [fucntion for any async callback that we want to keep context in]
   * @return {[function]}            [The Returned function will be invoke, and we will invoke the callback with 'this']
   */
  function use(callback){
    var _this = this;
    return function(done, options){
      callback.apply(_this, [done, options])
    }
  }


  function findModules(prompts, modulesDir){
    var modulesDir = modulesDir || this.get('modulesDir');
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


  function Dirs(options, directory){
    readDirectory();
    return options;
    function readDirectory(){
      fs.readDirSync(directory).forEach(function ( folder ) {
        var stat = fs.statSync(directory + '/' + folder);

        if(stat.isDirectory()){
          console.log(folder);
        }
      })
    }
  }


}).call(this);