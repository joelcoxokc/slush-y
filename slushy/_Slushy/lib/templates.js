;(function(){

  'use strict';
  var _    = require('lodash'),
      path = require('path');

  var Generators               = module.exports;
    Generators.crud          = crud;
    Generators.server        = server;
    Generators.client        = client;
    Generators.default       = defaults;


    // Generators.express  = {};

    function crud ( root ) {
      var templates = {};
        templates.root = path.join( root, 'generators-crud', 'templates' );
        templates.angular.module  = {
        path: path.join( templates.root, 'angular-module',  'module' ),
        all:  path.join( templates.root, 'angular-module',  'module', '**/*')
        }
        templates.angular.options =  {
        path: path.join( templates.root, 'angular-module', 'options' ),
        all:  path.join( templates.root, 'angular-module', 'options', '**/*' )
        }
        templates.express = {
        path: path.join( templates.root, 'express-modules','server' ),
        all:  path.join( templates.root, 'express-modules','server', '**/*' )
        }
    }

    function client ( root, name ) {

      return function (option){
        var templates  = {};
        templates.root = path.join( root, 'templates' )
        templates      = createBase( templates );
        templates      = createOptions( templates )
        return templates;
      }
    }

    function server ( root, name ) {
      var templates  = {};
      templates.root = path.join( root, 'generator-server', name, 'templates' );
      templates      = createBase( templates );
      return templates;
    }

    function defaults ( root ) {

      return function (option){

          var templates     = {};
          templates.root    = path.join( root, 'templates' );

          templates.static  = createTemplateHandlers( templates.root, 'static');
          templates.client  = createTemplateHandlers( templates.root, 'client');
          templates.server  = createTemplateHandlers( templates.root, 'server');

          templates.static.base = createTemplateHandlers( templates.static.path, 'base');
          templates.client.base = createTemplateHandlers( templates.client.path, 'base');
          templates.server.base = createTemplateHandlers( templates.server.path, 'base');

          templates.static.options = createTemplateOptions( templates.static.path, option);
          templates.client.options = createTemplateOptions( templates.client.path, option);
          templates.server.options = createTemplateOptions( templates.server.path, option);

          return templates;
      }

    }

    function createTemplateHandlers ( root, directory ) {
      var temp = {};
      // console.log(root, directory)
      temp.path = path.join( root, directory  );
      temp.all = pattern( temp.path)('**/*');
      temp.pattern = pattern( temp.path );
      temp.any     = any(temp.path);
      return temp;

    }
    function createTemplateOptions ( root, option ) {
      var temp = {};

      temp.path = path.join( root, 'options', option);
      temp.all = pattern( temp.path)('**/*');
      temp.pattern = pattern( temp.path );
      temp.any     = any( temp.path );

      return temp;

    }

    function createBase ( templates ){

      templates.base = {};
      templates.base.path = path.join( templates.root, 'base' );
      templates.base.all  = pattern( templates.base.path )( '**/*' );
      templates.base.pattern = pattern( templates.base.path );
      templates.base.any     = any( templates.base.path );
      return templates;
    }

    function createOptions ( templates ) {

      templates.options          = {};
      templates.options.path     = path.join( templates.root, 'options' );
      templates.options.all      = path.join( templates.options.path, '**/*'    );
      templates.options.pattern  = pattern( templates.options.path );
      templates.options.any         = any( templates.options.path );
      return templates;
    }

    function pattern ( root ){

      return function ( glob ){

        if ( Array.isArray( glob ) ){

          // return
           var globs = _.map( glob, function (value, key) {
            return path.join( root, value );
          });
           // console.log(globs);
           return globs;

        }
        // Else
        return path.join( root, glob );
      }

    }

    function any ( root ){

      return function ( glob ){

        if ( Array.isArray( glob ) ){

          // return
           var globs = _.map( glob, function (value, key) {
            return path.join( root, value, '/*' );
          });
           // console.log(globs);
           return globs;

        }
        // Else
        return path.join( root, glob, '/*' );
      }

    }

}).call(this);