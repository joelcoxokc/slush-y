;(function(){

  'use strict';
  var Q = require('Q');
  var _ = require('lodash');
  var _str = require('underscore.string');
  var inflections = require('inflection');
  var path = require('path');


  // console.log(_)
  _.mixin({
    'build':  build,
    '$build': $build,
    'dir': dir
  })

  module.exports = _;

  function $build(params){
    var $promised = Q.defer();
    // console.log('promise', params)
    $promised.resolve(_.build(params));
    return $promised.promise;
  }

  function build(params){
    params.slugName = _str.slugify(params[params.ref]);
    params.slugPluralName = inflections.pluralize(params.slugName);
    params.slugSingleName = inflections.singularize(params.slugName);
    params.camelPluralName = _str.camelize(params.slugPluralName);
    params.camelSingleName = _str.camelize(params.slugSingleName);
    params.classPluralName = _str.classify(params.slugPluralName);
    params.classSingleName = _str.classify(params.slugSingleName);
    params.humanizedPluralName = _str.humanize(params.slugPluralName);
    params.humanizedSingleName = _str.humanize(params.slugSingleName);
    return params;
  }

  function dir(){
    var args = _.toArray(arguments);
    // args.unshift(__dirname+'');

    return path.join.call(args)
  }




})();
