/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var indexer = require('../components/indexer');
var path = require('path');

module.exports = function(){

  var seeds = indexer.all('./server/api')
  seeds.forEach(function (seed){
    require( path.join(seed.path, seed.name+'.seed') )
  })
  // globber('./server/api/**/*.seed.js').forEach(function( seedPath ) {
  //   require(path.resolve( seedPath ));
  // });

}