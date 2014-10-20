var gulp = require('gulp');
var inquirer = require('inquirer');
var $ = require('gulp-load-plugins')({lazy:false});
var Storage = require('./config/storage');
var Q = require('q');
var prompts = require('./config/prompts');
var GulpProto = require('gulp').Gulp;
var defaults = require('./config/defaults');
var chalk = require('chalk');
var _ = require('lodash');
var ___ = require('underscore.string');
var fs = require('fs')
// var yeoman = require('yeoman-generator');


// console.log(yeoman.generators)

function Slushy(){
  this.defaults = defaults;
  // console.log(defaults)
  // this.prompt = inquirer.prompt;
  this.config = new Storage('Slush-Config', './slush-y.json');
}

// Slushy.prototype = _.create(inquirer, { 'constructor': Slushy });
// Slushy.prototype = _.create(Storage.prototype, { 'constructor': Slushy });

Slushy.prototype.start = function( tasks ){


  var instance = this;
  var run;
  _( tasks ).forEach( function (path, name){

    run = require('./'+path).call(instance);
    // console.log(path, name)
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
  // console.log('-------->  Starting Default')

  var instance = this;
  var q = Q.defer();
  inquirer.prompt( prompts(this.defaults).default, function (answers){
    // console.log('promised', answers);
    instance.store(answers);
    q.resolve(answers)
  });
  // console.log('-------->  Ending Default')
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
    config.appDir = './server';
    config.js = true;
    config.script = 'js';
    config.auth = true;
    config.http = true;
    config.restangular = false;
    config.httpType = 'http';


    config.modulesDir = './client/app/modules';
    config.modules = [
      'core',
      'authentication',
      'administration',
      'generators'
    ]


    this.store(config);



    return config;
}


Slushy.prototype.prompt = function(prompts){
  var q = Q.defer()
  // console.log(prompts)
  inquirer.prompt(prompts , function (answers){

    q.resolve(answers)

  })

  return q.promise;
}


/**
 * Slushy.ask will first search the prompts.js for the prompt option
 * then it will pass the prompts on to Slushy.getCurrentModules.
 * Who will return the list of prompts, with the proper modules on them.
 * Then we will call this.prompt... who will return a promise;
 *
 *
 * @param  {String}  option    this needs to be the string of the task you are running, and the prompts for this task must be in the prompts file
 * @return {Promise}           Returns a promise that will be resolved with the user's answers
 */

Slushy.prototype.ask = function(option){

  var questions = prompts( this.defaults )[option];
  questions = this.getCurrentModules(questions);


  return this.prompt(questions).then(function (options){
    return options;
  })
}

Slushy.prototype.getCurrentModules = function(prompts){
  var q = Q.defer();
  var modulesDir = this.get('modulesDir');

  readModules();
  q.resolve(prompts)
  return q.promise;

  function readModules(){

    fs.readdirSync(modulesDir).forEach(function(folder) {
      var stat = fs.statSync(modulesDir + '/' + folder);
      if (stat.isDirectory()) {
        prompts[0].choices.push({
          value: folder,
          name: folder
        });
      }
    });

  }
};


Slushy = Slushy;



// console.log('Ylo=========', _.functions(Slushy.prototype))

// console.log(Slushy.path)
// console.log(Slushy.name)

module.exports = Slushy;











