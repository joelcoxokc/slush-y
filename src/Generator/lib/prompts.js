var path = require('path');
var fs = require('fs');

module.exports = addPrompt;

function addPrompt(prompt){
  var pendingPrompts = {
    module : {
      type: 'list',
      name: 'module',
      default: 'core',
      message: 'Which module does this controller belongs to?',
      choices: [{
          name: 'core',
          value: 'core'
        }]
    },
    providers: {
      name: 'providers',
      message: 'inject any providers? (please camma separate each)',
    },
    functions: {
      name: 'functions',
      message: 'add fucntions to $scope? (please camma separate each)',
    }
  }
  var prompts = pendingPrompts[prompt];
  if(prompt === 'module'){
    prompts.module = findModules(prompts);
  }
  return prompts;
}

function findModules(prompt){
  modulesDir = path.join(process.cwd(), 'client/app/modules');
  readModules();
  return prompt;
  function readModules(){
    fs.readdirSync( modulesDir ).forEach(function (folder) {

      var stat = fs.statSync(modulesDir + '/' + folder);
      if (stat.isDirectory()) {
        prompt.choices.push({
          value: folder,
          name: folder
        });
      }
    });
  }
}