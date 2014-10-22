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



      //   // Menu configuration
      //     if (answers.addMenuItems) {
      //       answers.menuId = 'topbar';
      //         gulp.src( moduleDir + 'base/config/**' )
      //       .pipe(template(answers))
      //       .pipe(rename(function(file) {
      //                 if (file.basename.indexOf('_') == 0) {
      //                     file.basename = answers.slugifiedPluralName + '.'+file.basename.slice(2);
      //                 }
      //          }))
      //       .pipe(conflict('client/app/modules/' + answers.slugifiedPluralName+'/'))
      //       .pipe(gulp.dest('client/app/modules/' + answers.slugifiedPluralName+'/'));
      //     }
