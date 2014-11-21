;(function(){
  'use strict';


    var inflect   = require('inflection');
    var _str      = require('underscore.string');
    //////////////////////////////////////////////


    var Stringify = module.exports
        Stringify.str = str;

    function str(){

      return {
        simple: simple,
        multi:multi
      }

      function simple(name){
        var names = {};
        names.slug   = _str.slugify(name);
        names.classed   = _str.classify(names.slug);
        names.humanized = _str.humanize(names.slug);
        names.camelized = _str.camelize(names.slug);
        return names;

      }
      function multi(name){
        var names = {};
        names.single = {};
        names.plural = {};
        names.slug              = _str.slugify(name);
        names.single.slug       =  inflect.singularize(names.slug);
        names.single.camel      =  _str.camelize(names.single.slug);
        names.single.classed    =  _str.classify(names.single.slug);
        names.single.humanized  =  _str.humanize(names.single.slug)
        names.plural.slug       =  inflect.pluralize(names.single.slug);
        names.plural.camel      =  _str.camelize(names.plural.slug);
        names.plural.classed    =  _str.classify(names.plural.slug);
        names.plural.humanized  =  _str.humanize(names.plural.slug);

        return names;
      }
    }


}).call(this);