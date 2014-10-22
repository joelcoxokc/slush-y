/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Generator = require('./generator.model');
// var FolderSchema = new Schema({
//   title: String,
//   name: String,
//   dir: { type: Boolean, default: true },
//   extension: String,
//   info: String,
//   active: { type: Boolean, default: true },
//   children: [FolderSchema]
// })
Generator.find({}).remove(function() {
  Generator.create(
    {
      position: 1,
      title : 'Crud Module',
      type: ['client', 'server'],
      command: 'slush y:crud <module-name>',
      example: 'slush y:crud people',
      info : [
        'The CRUD module sub-generator will help you create a new CRUD module. (CREATE, READ, UPDATE, DELETE)',
        'The CRUD Module will generate a whole new module in your client side modules directory.'
      ],
      client_files: [
        {
          title:'config',
          name: 'config',
          dir: true,
          info: 'Directory contains any AngularJS .config() components, including routes',
          children: [
            {
              title: 'module configuration',
              name: '<module-name>.config.js',
              dir:false,
              extension: 'js'
            },{
              title: 'module routes',
              name: '<module-name>.routes.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'controllers',
          name: 'controllers',
          dir: true,
          info: 'Directory contains all AngularJS controllers for this module',
          children: [
            {
              title: 'module controller',
              name: '<module-name>.controller.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'directives',
          name: 'directives',
          dir: true,
          info: 'Directory contains all AngularJS directives for this module',
          children: [
            {
              title: 'module directive',
              name: '<module-name>.directive.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'services',
          name: 'services',
          dir: true,
          info: 'Directory contains all AngularJS services or factories for this module',
          children: [
            {
              title: 'module service',
              name: '<module-name>.service.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'tests',
          name: 'tests',
          dir: true,
          info: 'Directory contains all tests for this module',
          children: [
            {
              title: 'module controller test',
              name: '<module-name>.controller.test.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'views',
          name: 'views',
          dir: true,
          info: 'Directory contains all html views for this module',
          children: [
            {
              title: 'module view',
              name: '<module-name>.view.html',
              dir:false,
              extension: 'html'
            }
          ]
        },
      ],
      server_files: [
        {
          title: 'model',
          name:'<module-name>.model.js',
          dir: false,
          extension: 'js',
          info: 'and Mongoose.model and Schema',
          active: true
        }
      ]
    },{
      position: 2,
      title : 'AngularJS Module',
      type: ['client'],
      command: 'slush y:module <module-name>',
      example: 'slush y:module people',
      info : [
        'The AngularJS Module Sub Generator will first ask you which folders you would like to include.',
        'The the sub generator will generate a new module in your modules directory.',
        'The module will simply contain a bunch of empty folders (config, controllers, services, views, ... etc).',
        'In order to pupulate the module\'s components, use the rest of the rest of the AngularJS Sub Generators.'
      ],
      client_files: [
        {
          title:'config',
          name: 'config',
          dir: true,
          info: 'Generates an empty config directory.',
        },{
          title:'controllers',
          name: 'controllers',
          dir: true,
          info: 'Generates an empty controllers directory.',
        },{
          title:'directives',
          name: 'directives',
          dir: true,
          info: 'Generates an empty directives directory.',
        },{
          title:'filters',
          name: 'filters',
          dir: true,
          info: 'Generates an empty filters directory.',
        },{
          title:'images',
          name: 'images',
          dir: true,
          info: 'Generates an empty images directory.',
        },{
          title:'services',
          name: 'services',
          dir: true,
          info: 'Generates an empty services directory.',
        },{
          title:'styles',
          name: 'styles',
          dir: true,
          info: 'Generates an empty styles directory.',
        },{
          title:'tests',
          name: 'tests',
          dir: true,
          info: 'Generates an empty tests directory.',
        },{
          title:'views',
          name: 'views',
          dir: true,
          info: 'Generates an empty views directory.',
        },{
          title:'<module-name>.module.js',
          name: '<module-name>.module.js',
          dir: false,
          info: 'Generates an AngularJS Module.',
        },
      ]
    },{
      position: 3,
      title : 'AngularJS Route',
      type: ['client'],
      command: 'slush y:route <module-name>',
      example: 'slush y:route people',
      info : [
        'The AngularJS Route Sub Generator will first ask you which module you would like to add this route to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate an angular config, containing the router logic, in the config directory for that module',
        'The generator will also generate a controller in the controllers directory.',
        'The generator will also generate a test in the tests directory.',
        'The generator will also generate a view in the views directory.',
        'Make sure you type the name of the route when you run the command'
      ],
      client_files: [
        {
          title:'config',
          name: 'config',
          dir: true,
          info: 'Generates an AngularJS config file with the router logic.',
          children: [
            {
              title: 'Router configuration',
              name: '<route-name>.routes.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'controllers',
          name: 'controllers',
          dir: true,
          info: 'Generates a controller for the route',
          children: [
            {
              title: 'Route Controller',
              name: '<route-name>.controller.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'tests',
          name: 'tests',
          dir: true,
          info: 'Generates a test for the route controller.',
          children: [
            {
              title: 'Route Controller Test',
              name: '<route-name>.controller.test.js',
              dir:false,
              extension: 'js'
            }
          ]
        },{
          title:'views',
          name: 'views',
          dir: true,
          info: 'Gnerates a view for the route.',
          children: [
            {
              title: 'Route View',
              name: '<route-name>.view.html',
              dir:false,
              extension: 'html'
            }
          ]
        },
      ],
    },{
      position: 4,
      title : 'AngularJS Config',
      type: ['client'],
      command: 'slush y:config <module-name>',
      example: 'slush y:config people',
      info : [
        'The AngularJS Config Sub Generator will first ask you which module you would like to add this config to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate an angular config file in the config directory for that module',
        'Make sure you type the name of the config when you run the command'
      ],
      client_files: [
        {
          title:'config',
          name: 'config',
          dir: true,
          info: 'Generates an AngularJS config file in the module\'s config directory.',
          children: [
            {
              title: 'Module Configuration',
              name: '<module-name>.config.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 5,
      title : 'AngularJS Controller',
      type: ['client'],
      command: 'slush y:controller <module-name>',
      example: 'slush y:controller people',
      info : [
        'The AngularJS Controller Sub Generator will first ask you which module you would like to add this controller to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a controller in the controllers directory for that module',
        'Make sure you type the name of the controller when you run the command'
      ],
      client_files: [
        {
          title:'controller',
          name: 'controller',
          dir: true,
          info: 'Generates an AngularJS controller file in the module\'s controllers directory.',
          children: [
            {
              title: 'Module Controller',
              name: '<module-name>.controller.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 6,
      title : 'AngularJS Directive',
      type: ['client'],
      command: 'slush y:directive <module-name>',
      example: 'slush y:directive people',
      info : [
        'The AngularJS Directive Sub Generator will first ask you which module you would like to add this directive to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a directive in the directives directory for that module',
        'Make sure you type the name of the directive when you run the command'
      ],
      client_files: [
        {
          title:'directive',
          name: 'directive',
          dir: true,
          info: 'Generates an AngularJS directive file in the module\'s directives directory.',
          children: [
            {
              title: 'Module Directive',
              name: '<module-name>.directive.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 7,
      title : 'AngularJS Factory',
      type: ['client'],
      command: 'slush y:factory <module-name>',
      example: 'slush y:factory people',
      info : [
        'The AngularJS Factory Sub Generator will first ask you which module you would like to add this factory to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a factory in the services directory for that module',
        'Make sure you type the name of the factory when you run the command'
      ],
      client_files: [
        {
          title:'factory',
          name: 'factory',
          dir: true,
          info: 'Generates an AngularJS factory file in the module\'s services directory.',
          children: [
            {
              title: 'Module Factory',
              name: '<module-name>.factory.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 8,
      title : 'AngularJS Service',
      type: ['client'],
      command: 'slush y:service <module-name>',
      example: 'slush y:service people',
      info : [
        'The AngularJS Service Sub Generator will first ask you which module you would like to add this service to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a service in the services directory for that module',
        'Make sure you type the name of the service when you run the command'
      ],
      client_files: [
        {
          title:'service',
          name: 'service',
          dir: true,
          info: 'Generates an AngularJS service file in the module\'s services directory.',
          children: [
            {
              title: 'Module Service',
              name: '<module-name>.service.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 9,
      title : 'AngularJS Filter',
      type: ['client'],
      command: 'slush y:filter <module-name>',
      example: 'slush y:filter people',
      info : [
        'The AngularJS Filter Sub Generator will first ask you which module you would like to add this filter to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a filter in the filters directory for that module',
        'Make sure you type the name of the filter when you run the command'
      ],
      client_files: [
        {
          title:'filter',
          name: 'filter',
          dir: true,
          info: 'Generates an AngularJS filter file in the module\'s filters directory.',
          children: [
            {
              title: 'Module Filter',
              name: '<module-name>.filter.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 10,
      title : 'AngularJS Test',
      type: ['client'],
      command: 'slush y:test <module-name>',
      example: 'slush y:test people',
      info : [
        'The AngularJS Test Sub Generator will first ask you which module you would like to add this test to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a test in the tests directory for that module',
        'Make sure you type the name of the test when you run the command'
      ],
      client_files: [
        {
          title:'test',
          name: 'test',
          dir: true,
          info: 'Generates an AngularJS test file in the module\'s tests directory.',
          children: [
            {
              title: 'Module Test',
              name: '<module-name>.test.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    },{
      position: 11,
      title : 'AngularJS View',
      type: ['client'],
      command: 'slush y:view <module-name>',
      example: 'slush y:view people',
      info : [
        'The AngularJS View Sub Generator will first ask you which module you would like to add this view to.',
        'The modules will be any module in your client/app/modules directory.',
        'Once you choose a module, the sub generator will generate a view in the views directory for that module',
        'Make sure you type the name of the view when you run the command'
      ],
      client_files: [
        {
          title:'view',
          name: 'view',
          dir: true,
          info: 'Generates an AngularJS view file in the module\'s views directory.',
          children: [
            {
              title: 'Module View',
              name: '<module-name>.view.js',
              dir:false,
              extension: 'js'
            }
          ]
        }
      ]
    }
  );
});

// config
// controllers
// directives
// services
// tests
// styles
// views