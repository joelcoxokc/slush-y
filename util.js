(function(){

  'use strict';

    var $ = require('underscore.string');
    var _ = require('lodash');
    var inflections = require('inflection')

  module.exports = new Utility();

  function Utility(){

    var Class = function(){

      // this.templatesDir = './';
    }

    Class.prototype.makeStrings = function( answers, name ){

      answers.slugifiedName = $.slugify(name);

      answers.slugifiedPluralName = inflections.pluralize(answers.slugifiedName);
      answers.slugifiedSingularName = inflections.singularize(answers.slugifiedName);
      answers.camelizedPluralName = $.camelize(answers.slugifiedPluralName);
      answers.camelizedSingularName = $.camelize(answers.slugifiedSisngularName);
      answers.classifiedPluralName = $.classify(answers.slugifiedPluralName);
      answers.classifiedSingularName = $.classify(answers.slugifiedSingularName);
      answers.humanizedPluralName = $.humanize(answers.slugifiedPluralName);
      answers.humanizedSingularName = $.humanize(answers.slugifiedSingularName);
      return answers;
    }

    return new Class;
  }




})();