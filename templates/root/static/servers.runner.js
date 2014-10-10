


/*
 * By requiring the the vile, node runs the server;
 */
module.exports.all = function(){
  // Run all servers located in the servers dir
  require('./servers/server/app.js');
}
module.exports.base = function(){
  // Run Only the base server to serve up the app
  require('./servers/server/app.js');
}
