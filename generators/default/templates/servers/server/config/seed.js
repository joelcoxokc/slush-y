/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var globber = require('../components/globber');
var path = require('path');

module.exports = function(){

  globber('./server/api/**/*.seed.js').forEach(function( seedPath ) {
    require(path.resolve( seedPath ));
  });

}