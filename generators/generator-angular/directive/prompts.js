module.exports = var prompts = [{
          type: 'list',
          name: 'moduleName',
          default: 'core',
          message: 'Which module does this directive belongs to?',
          choices: [{
            name: 'core',
            value: 'core'
          }]
        }];