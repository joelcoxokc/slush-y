var prompts = [{
  type: 'checkbox',
  name: 'folders',
  message: 'Which supplemental folders would you like to include in your angular module?',
  choices: [{
    value: 'addCSSFolder',
    name: 'css',
    checked: true
  }, {
    value: 'addImagesFolder',
    name: 'img',
    checked: true
  }, {
    value: 'addDirectivesFolder',
    name: 'directives',
    checked: true
  }, {
    value: 'addFiltersFolder',
    name: 'filters',
    checked: true
  }]
}, {
  type: 'confirm',
  name: 'addMenuItems',
  message: 'Would you like to add the CRUD module links to a menu?',
  default: true
}];

module.exports = prompts;