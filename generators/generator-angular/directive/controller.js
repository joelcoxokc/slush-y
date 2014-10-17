var fs = require('fs');
var inquirer = require('inquirer');
var Q = require('q');
var _ = require('underscore.string');

exports.argsError = function(){
  console.log('******    Incorrect usage of the sub-generator!!      ******');
  console.log('******    Try slush y:directive <controller-name>     ******');
  console.log('******    Ex: slush y:directive article               ******');
}

exports.proccessFile = function(file, answers){
  if (file.basename.indexOf('_') == 0) {
      file.basename = file.basename.replace('_', answers.slugifiedName);
  }
  return file;
}


exports.getCurrentModules = function(prompts, modulesFolder){

  readModules();

  return prompts;

  function readModules(){

    fs.readdirSync(modulesFolder)
      .forEach(function (folder) {
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
    answers.slugifiedName = _.slugify(_.humanize(moduleName));
    answers.camelizedName = _.camelize(answers.slugifiedName);
    answers.humanizedName = _.humanize(answers.slugifiedName);


    answers.destination = 'client/app/modules/'
    if( answers.moduleName === 'core'){
      answers.destination = 'client/app/'
    }
    promised.resolve( answers );

  });

  return promised.promise;
}








