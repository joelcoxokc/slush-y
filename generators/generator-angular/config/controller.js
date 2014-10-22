var fs = require('fs');
var inquirer = require('inquirer');
var Q = require('q');
var _ = require('underscore.string');

exports.argsError = function(){
  console.log('******    Incorrect usage of the sub-generator!!   ******');
  console.log('******    Try slush y:config <config-name>         ******');
  console.log('******    Ex: slush y:config article               ******');
}

exports.proccessFile = function(file, answers){
  if (file.basename.indexOf('_') == 0) {
    file.basename = file.basename.replace('_', answers.slugifiedName);
  }
  return file;
}


exports.getCurrentModules = function(prompts, modulesFolder){
  var promised = Q.defer();

  readModules();
  promised.resolve( prompts, modulesFolder);
  return promised.promise;

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


    promised.resolve( answers );

  });

  return promised.promise;
}








