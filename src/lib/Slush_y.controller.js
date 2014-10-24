;(function(){
    'use strict';

      var Q = require('q');
      var _str = require('underscore.string');
      var inflect   = require('inflection');

      module.exports = Controller;

      /////////////////////

      function Controller (param) {

        var __this = this;

        function privateMethod(){}

        this.privilegedMethod = function(){}

      }

      Controller.prototype.publicMethod = function() {};

      Controller.prototype.isRunning = function(args){
        // this.log('Running  ['+this.blueB('sub-generator')+']:' + this.blueB( generator.name ));
        var generator = _(args).filter(function (value){ return value.running && value.running !== undefined }).value()[0];
        return generator;
      };

      Controller.prototype.bindGenerator = function(path) {
        var __this = this;
        return function (options){
          require(path).call(__this, options)
        }
      };
      Controller.prototype.ask = function (prompts) {
        var __this = this;
        var $promised = Q.defer();
        __this.prompt(prompts, function (answers){
          // if(!answers)
          console.log('============================= answers', answers);
          $promised.resolve( answers )
        })
        return $promised.promise;
      }
      Controller.prototype.str = function(string, ref, options){
          var options   = options || {};
          var ref       = ref     || 'values';
          options[ref]  = {};
          options[ref].name = string;
          options = base(options);

          return {
            values: options,
            multi:multi
          }

          function base(options){
            options[ref].slug      = _str.slugify(_str.humanize(options[ref].name));
            options[ref].classed   = _str.classify(options[ref].slug);
            options[ref].humanized = _str.humanize(options[ref].slug);
            options[ref].camelized = _str.camelize(options[ref].slug);
            options[ref].humanized = _str.humanize(options[ref].name);
            return options;

          }
          function multi(){
            options[ref].slugPlural       = inflect.pluralize(options[ref].slug);
            options[ref].slugSingle       = inflect.singularize(options[ref].slug);
            options[ref].camelPlural      = _str.camelize(options[ref].slugPlural);
            options[ref].camelSingle      = _str.camelize(options[ref].slugSingle);
            options[ref].classedPlural    = _str.classify(options[ref].slugPlural);
            options[ref].classedSingle    = _str.classify(options[ref].slugSingle);
            options[ref].humanizedPlural  = _str.humanize(options[ref].slugPlural);
            options[ref].humanizedSingle  = _str.humanize(options[ref].slugSingle);
            return options;
          }
      }

      Controller.prototype.askToReset = function( options ) {

        var __this = this;
        var $promised = Q.defer();
        var prompts = [{
          type: 'confirm',
          name: 'reset',
          message: 'Seems as though you already have current configuration in your .sl-y.json, Would you like to overwrite this?',
          default: true
        }]
        __this.prompt(prompts, function (answers){

          options.reset = answers.reset;

          $promised.resolve( options );
        })
        return $promised.promise;
      };

      Controller.prototype.processFile  = function (bool, file, options){
          if(!bool){
            if (file.basename.indexOf('__') == 0) {
              file.basename = '.' + file.basename.slice(2);
            }
          } else {
            if (file.basename.indexOf('_') == 0) {
              file.basename = file.basename.replace('_', options.slugName);
            }
          }
          return file;
      };

}).call(this);