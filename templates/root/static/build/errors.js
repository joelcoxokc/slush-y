// # Error handling setup
// # See: http://www.artandlogic.com/blog/2014/05/error-handling-in-gulp/

var fatalLevel = require('yargs').argv.fatal;

var ERROR_LEVELS = ['error', 'warning'];

module.exports = {

  // # Convenience handlers to be used in gulp .on('error', callback)
  onError: function(error){ return handleError.call(this, 'error', error); },
  onWarning: function(error){ return handleError.call(this, 'warning', error); }
};

// # Log error and kill process
var ndleError = function(level, error){

  console.log( error.message );
  console.log( "Level: " + level + " isFatal" + isFatal(level) );
  if ( isFatal(level) ){
    process.exit(1);
  }
};

// # Determine if the error is fatal. Returns true if the given level is
// # equal to or more severe than the given fatality level (via cli arg).
// # Defaults to fatality level to error if not set by user or some task default
var isFatal = function(level) {
  return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
};