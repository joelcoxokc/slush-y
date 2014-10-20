(function(){
  'use strict';

  var prompts = [{
      type: 'list',
      name: 'moduleName',
      default: 'core',
      message: 'Which module does this service belongs to?',
      choices: [{
        name: 'core',
        value: 'core'
      },{
        name: 'authentication',
        value: 'authentication'
      }]
    }];

    module.exports = prompts;

}).call(this);