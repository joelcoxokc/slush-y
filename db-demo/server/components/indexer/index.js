(function(){
  'use strict';
  var path = require('path'),
      root = path.join(__dirname+'', '../../../'),
      fs   = require('fs');

  var indexer   = module.exports;
    indexer.all = all;

    function all( dir, passed){
      dir = path.join( root, dir );
      var dirs = fs.readdirSync(dir);
      dirs.forEach(function ( item, index ){
        var req = path.join( dir, item );
        dirs[index] = { path:req, name:item };
      })
      return dirs

    }

})()
