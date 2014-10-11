var fs = require('fs-extra')

function Config(path){
  this.path = path;
  this.data = fs.readJSONSync( this.path ) || {}
}

Config.prototype.constructor = Object.create(Config);
Config.prototype.Config = Config;

Config.prototype.get = function(key){
  this.data = fs.readJSONSync( this.path ) || this.data;

  if( key ){
    return this.data[key];
  }
  if( this.data ){
    return this.data;
  }
}
Config.prototype.set = function(key, val){
  var self = this;
  this.data = fs.readJSONSync( this.path ) || this.data;

  this.data[key] = val;

  fs.outputJson(this.path, this.data, function(err) {
    console.log("Error saving data", err); //null

    fs.readJson(self.path, function(err, data) {
      console.log("Data Saved", data.name); //'JP
    })
  })

}

module.exports = Config;