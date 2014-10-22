(function(){
  'use strict';

  var prompts = [{
      type: 'list',
      name: 'moduleName',
      message: 'Which module does this service belongs to?',
      choices: [{
        name: 'core',
        value: 'core'
      }]
    }];

    module.exports = prompts;

}).call(this);