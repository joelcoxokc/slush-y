var gulp = require('gulp'),
  ___ = require('underscore.string'),
  _ = require('lodash'),
  inquirer = require('inquirer'),
  $ = require('gulp-load-plugins')({lazy:false}),
  Storage = require('./config/storage'),
  Q = require('q'),
  prompts = require('./config/prompts'),
  GulpProto = require('gulp').Gulp,
  defaults = require('./config/defaults')


function Slushy(){
  this.defaults = defaults;
  console.log(defaults)
  this.config = new Storage('Slush-Config', './slush-y.json');
}

// Slushy.prototype = _.create(GulpProto.prototype, { 'constructor': Slushy });
// Slushy.prototype = _.create(Storage.prototype, { 'constructor': Slushy });

Slushy.prototype.start = function( tasks ){


  var instance = this;
  var run;
  _( tasks ).forEach( function (path, name){

    run = require('./'+path).call(instance);
    console.log(path, name)
    gulp.task(name, run);

  })

  return gulp
}

Slushy.prototype.store = function(options){
  var slushy = this;
  _(options).forEach(function (item, key){
    slushy.set(key, item);
  });
  return this.config.getAll();
}

Slushy.prototype.get = function(key){
  if(key){
    return this.config.get(key);
  } else {
    return this.config.getAll();
  }
}

Slushy.prototype.set = function(key, val){
  this.config.set(key, val);
  return this.config.get(key);
}

Slushy.prototype.default = function(){
  console.log('-------->  Starting Default')

  var instance = this;
  var q = Q.defer();
  inquirer.prompt( prompts(this.defaults).default, function (answers){
    // console.log('promised', answers);
    instance.store(answers);
    q.resolve(answers)
  });
  console.log('-------->  Ending Default')
  return q.promise;
}

Slushy.prototype.createFilters = function(){
    var config = this.get();

    config.slugifiedAppName = ___.slugify(config.appName);
    config.humanizedAppName = ___.humanize(config.appName);
    config.capitalizedAppAuthor = ___.capitalize(config.authorName);


    _(config.modules).forEach(function (item, key){
      config[key] = ___.contains(config.modules, key);
    })


    config.clientDir = './client';
    config.serverDir = './server';
    config.js = true;
    config.script = 'js';
    config.auth = true;
    config.http = true;
    config.restangular = false;
    config.httpType = 'http';
    this.store(config);
    return config;
}


Slushy = new Slushy;

// console.log(_.functions(Slushy))
// console.log(Slushy.path)
// console.log(Slushy.name)

module.exports = Slushy;