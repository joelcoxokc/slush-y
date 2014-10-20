module.exports = function(options){
  options = options || null;
  prompts = {

    default: [{
        name: 'appName',
        message: 'What is the name of your project?',
        default: options.appName
      }, {
        name: 'appDescription',
        message: 'What is the description?'
      }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.1.0'
      }, {
        name: 'authorName',
        message: 'What is the author name?',
      }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: options.authorEmail
      }, {
        name: 'userName',
        message: 'What is the github username?',
        default: options.userName
      }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
      }],

    configuration: [
      {
        type: 'list',
        name: 'moduleName',
        default: 'core',
        message: 'Which module does this controller belongs to?',
        choices: [{
          name:'core',
          value: 'core'
        }]
      }
    ]
  }
  return prompts;
}