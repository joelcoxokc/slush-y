(function(){

  'use strict';

    var $ = require('underscore.string');
    var _ = require('lodash');

  module.exports = new Utility();

  function Utility(){

    var Class = function(){

      this.templatesDir = './'
    }

    Class.prototype.stingify = function( answers, name ){

      answers.slugifiedName = _.slugify(name);

      answers.slugifiedPluralName = inflections.pluralize(answers.slugifiedName);
      answers.slugifiedSingularName = inflections.singularize(answers.slugifiedName);
      answers.camelizedPluralName = _.camelize(answers.slugifiedPluralName);
      answers.camelizedSingularName = _.camelize(answers.slugifiedSisngularName);
      answers.classifiedPluralName = _.classify(answers.slugifiedPluralName);
      answers.classifiedSingularName = _.classify(answers.slugifiedSingularName);
      answers.humanizedPluralName = _.humanize(answers.slugifiedPluralName);
      answers.humanizedSingularName = _.humanize(answers.slugifiedSingularName);
      return answers;
    }

    return Class;
  }




})();