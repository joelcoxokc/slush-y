var config = {
  app_file_name: 'app.js',
  modules_file_name: 'bundle.js',
  vendor_file_name: 'vendor.js',
  bower_file_name: 'bower_components.min.js',
  css_file_name: 'app.css',
  jade_file_name: 'cached_jade_templates.js',
  html_file_name: 'cached_html_templates.js',
  templates_file_name: 'cached_templates.js',
  module_name: '<%= slugifiedAppName %>',
  client: {
    path: './client/',

    specs: ['./client/app/app.js', './client/{app,components}/**/*.js', './client/{app,components}/**/*.spec.js','./client/{app,components}/**/*.test.js', './client/{app,components}/**/*.html'],
    scripts: {
      root: './client/app/app.js',
      modules: ['./client/{app,components}/**/*.js','!./client/{app,components}/**/*.spec.js','!./client/{app,components}/**/*.test.js', '!./client/app/app.js'],
      all: ['./client/{app,components}/**/*.js', '!./client/{app,components}/**/*.spec.js','!./client/{app,components}/**/*.test.js'],


    },
    styles: {
      stylus: './client/styles/app.styl',
      less: './client/styles/app.less',
      sass: './client/styles/app.scss',
      css: ['./client/styles/**/*.css'],
    },
    index: './client/index.html',
    templates:{
     jade: './client/{app,components}/**/*.jade',
     html: ['./client/{app,components}/**/*.html']
    },
    bower: './client/bower_components/',
    vendor: ['./client/vendor/**/*.js'],
    images: ['./client/assets/images/**/*']
  },
  build: {
    path: './.tmp/',
    stylePath: './.tmp/styles/',
    styles: './.tmp/styles/**/*.css',
    scriptPath: './.tmp/scripts/',
    scripts: ['./tmp/app/app.js', './.tmp/{app,components}/**/*.js'],
    templatePath: './.tmp/templates/',
    templates: './.tmp/templates/*.js',
    dist: './dist/public',
    images: './.tmp/images/**/*',
    fonts: './.tmp/fonts'
  },
  dist: {
    path: './dist/',
    images: './dist/assets/images/',
    scriptPath: './dist/scripts/',
    scripts: './dist/scritps/*.js',
    stylePath: './dist/styles/',
    styles: './dist/styles/*.css',
    bower: './dist/bower_components/',
    templatePath: './dist/templates/',
    templates: './dist/templates/*.js',
    index: './dist/index.html'
  },
  server: {
    path: './servers/',
    base: './servers/server/app.js',
    all: ['./servers/**/app.js', '!./servers/server/app.js']
  }
}
module.exports = config;