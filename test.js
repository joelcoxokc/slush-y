var _ = require('lodash')
module.exports = function(){
  console.log("Slush", _.functions(this))
  return function(done){
    console.log('gulp',  _.functions(this));
    done();
  }
}