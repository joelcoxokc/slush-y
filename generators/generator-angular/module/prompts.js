 module.exports = prompts = [{
      type: 'checkbox',
      name: 'folders',
      message: 'Which folders would you like your module to include?',
      choices: [{
        value: 'addConfigFolder',
        name: 'config',
        checked: true
      }, {
        value: 'addControllersFolder',
        name: 'controllers',
        checked: true
      }, {
        value: 'addStylesFolder',
        name: 'styles',
        checked: false
      }, {
        value: 'addDirectivesFolder',
        name: 'directives',
        checked: false
      }, {
        value: 'addFiltersFolder',
        name: 'filters',
        checked: false
      }, {
        value: 'addImagesFolder',
        name: 'images',
        checked: false
      }, {
        value: 'addServicesFolder',
        name: 'services',
        checked: true
      }, {
        value: 'addTestsFolder',
        name: 'tests',
        checked: true
      }, {
        value: 'addViewsFolder',
        name: 'views',
        checked: true
      }]
    }];