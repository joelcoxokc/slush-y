// var storage = require('./slushy/_Slushy/config/Storage');




;(function(){

  'use strict';
  var fs    = require('fs.extra');
  var _     = require('lodash');
  var path  = require('path');

  /**
   * Builder
   * @description  Builder is designed to recursively traverse the given root path,
   *               and return an object with a property for any give sub directory.
   *               Buidler will add the following methods to each directory with the
   *               rootDir including the rootDir.
   *
   * @property  {String}     path: '/some/url'    The path property is direct url to the given direcotry.
   * @method    {Function}   all:  function(){};  The all method will return a glob string joined with the path property
   *                                              for Example: if path === /some/directory  then all() would return /some/directory/* * / *
   * @method    {Function}   dirs  function(){};  The dirs method will return a glob for all given sub directories.
   *                                              You can pass dirs a name param, to select a specific sub dir, or an array of sub dirs.
   * @method    {Function}   ext   function(){};  The dirs method will return a glob for all files within the current direcory,
   *                                              You can pass ext an extension param, to select any files with the specific extension
   *                                              Or you can pass an array of extensions;
   * @method    {Function}   any                  The any method is specifically designed to take any glob pattern and return the paths,
   *                                              The any method can also handle arrays.
   *
   */

      module.exports = function(gulp){
        gulp.Gulp.prototype.build = build;
        return gulp;
      }


      function build(rootDir){
        var roots = getFolders(rootDir)
        var obj = {};
            obj = setPaths(roots, rootDir, obj);
        return obj;
      }

      function setPaths(rootDirs, base, obj){
        if( !rootDirs.length ){ return obj; }
        buildParrent();
        return obj;
        function buildParrent(){
          _(rootDirs).forEach(function (root){
            obj[root] = buildDir( path.join(base, root) );
            obj[root] = setSubs( obj[root] );
          })
        }
      }

      function setSubs(parent){
        var folders = getFolders( parent.path );
        if(!folders.length){ return parent; }

        parent.folders = folders;
        buildChildren();
        return parent;
        function buildChildren(){
          _.forEach(parent.folders, function (folder){
            parent[folder] = buildDir( path.join( parent.path, folder ) );
            parent[folder] = setSubs( parent[folder] );
          })
        }
      }


      function buildDir(root){
        var temp   = {};
        temp.path  = root;
        temp.all   = all( temp.path );
        temp.dirs  = any( temp.path );
        temp.ext   = any( temp.path );
        temp.any   = any( temp.path );
        return temp;
      }

      function getFolders(dir){
          return fs.readdirSync(dir)
            .filter(function (file){
              return fs.statSync(path.join(dir, file)).isDirectory();
            });
      }

      function all(root){
        return function (params){
          if(params){ return pattern(root)(params);  };
          return pattern(root)('**/*');
        }
      }

      function dirs(root){
        return function (params){
          if(params){ return pattern(root)(params); }
          return pattern(root)('**');
        }
      }

      function ext(root){
        return function (params){
          if(params){ return pattern(root)('*.'+params);  };
          return pattern(root)('*');
        }
      }
      function any(root){
        return function (params){
          if(params){ return pattern(root)(params);  };
          return pattern(root)('**');
        }
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

}).call(this);