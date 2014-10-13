var prompts = [
  {
    name: 'appName',
    message: 'What would you like to call your application?',
    default: 'Beast'
  }, {
    name: 'appDescription',
    message: 'How would you describe your application?',
    default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
  }, {
    name: 'appKeywords',
    message: 'How would you describe your application in comma seperated key words?',
    default: 'MongoDB, Express, AngularJS, Node.js'
  },{
    name: 'appAuthor',
    message: 'What is your company/author name?'
  },{
    type: 'list',
    name: 'script',
    message: 'What script would you like to use?',
    choices: [{
      value: 'js',
      name: 'Javascript',
      default: true
    }]

  },{
    type: 'list',
    name: 'httpType',
    message: 'How would you like to handle your http requests?',
    choices: [{
      value: 'restangular',
      name: 'Restangular',
      default: true
    },{
      value: 'http',
      name: 'angular $http',
      default: false
    }]
  },{
    type: 'confirm',
    name: 'auth',
    message: 'Would you like authentication built in?',
    default: true
  },{
    type: 'checkbox',
    name: 'modules',
    message: 'Which AngularJS modules would you like to include?',
    choices: [{
      value: 'angularCookies',
      name: 'ngCookies',
      checked: true
    }, {
      value: 'angularAnimate',
      name: 'ngAnimate',
      checked: true
    }, {
      value: 'angularTouch',
      name: 'ngTouch',
      checked: true
    }, {
      value: 'angularSanitize',
      name: 'ngSanitize',
      checked: true
    }]
  }];

module.exports = prompts;