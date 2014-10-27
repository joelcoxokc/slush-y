(function(){
  'use strict';

    var fs = require('fs');
    var iniparser = require('iniparser');


    function format(string) {
      var username = string.toLowerCase();
      return username.replace(/\s/g, '');
    }

    var defaults = (function () {

      var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        workingDirName = process.cwd().split('/').pop().split('\\').pop(),
        osUserName = homeDir && homeDir.split('/').pop() || 'root',
        configFile = homeDir + '/.gitconfig',
        user = {};

      if (fs.existsSync(configFile)) {
        user = iniparser.parseSync(configFile).user;
      }
      return {
        appName: workingDirName,
        userName: format(user.name) || osUserName,
        authorEmail: user.email || ''
      };
    })();

    module.exports = defaults;

})();