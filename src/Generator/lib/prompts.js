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
  return pendingPrompts[prompt];
}