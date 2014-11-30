(function(){
  'use strict';

  var Option;

  Option = module.exports = Option;

  function Option (flags, description) {
    this.flags = flags;
    this.required = ~flags.indexOf('<');
    this.optional = ~flags.indexOf('[');
    this.bool = !~flags.indexOf('-no-');
    flags = flags.split(/[ ,|]+/);
    if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
    this.long = flags.shift();
    this.description = description || '';
  }

  Option.prototype.name = function(){
    return this.long
      .replace('--', '')
      .replace('no-', '');
  }

  Option.prototype.is = function(arg) {
    return arg == this.short || arg == this.long;
  };

})();

