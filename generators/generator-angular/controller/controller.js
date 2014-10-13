var fs = require('fs');
var inquirer = require('inquirer');
var Q = require('q');
var _ = require('underscore.string');

exports.argsError = function(){
  console.log('******    Incorrect usage of the sub-generator!!      ******');
  console.log('******    Try slush y:controller <controller-name>    ******');
  console.log('******    Ex: slush y:controller article              ******');
}

exports.proccessFile = function(file, answers){
  if (file.basename.indexOf('_') == 0) {
    file.basename = file.basename.replace('_', answers.slugifiedControllerName);
  }
  return file;
}


exports.getCurrentModules = function(prompts, modulesFolder){

  readModules();
  return prompts;

  function readModules(){

    fs.readdirSync(modulesFolder).forEach(function(folder) {
      var stat = fs.statSync(modulesFolder + '/' + folder);
      if (stat.isDirectory()) {
        prompts[0].choices.push({
          value: folder,
          name: folder
        });
      }
    });
  }
};

exports.ask = function( prompts, moduleName ){

  var promised = Q.defer();

  inquirer.prompt( prompts, function (answers) {
    if (!answers) {
      return promised.reject()
    }
    answers.slugifiedModuleName = _.slugify(answers.moduleName);
    answers.slugifiedControllerName = _.slugify(_.humanize(moduleName));
    answers.classifiedControllerName = _.classify(answers.slugifiedControllerName);
    answers.humanizedControllerName = _.humanize(answers.slugifiedControllerName);

    promised.resolve( answers );

  });

  return promised.promise;
}








