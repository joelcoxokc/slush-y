var through = require("through2"),
  gutil = require("gulp-util");
  _    = require('lodash')
module.exports = function (param) {
  "use strict";

  // if necessary check for required param(s), e.g. options hash, etc.
  if (!param) {
    throw new gutil.PluginError("gulp-gulp", "No param supplied");
  }


  // see "Writing a plugin"
  // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
  function gulp(file, enc, callback) {
  // console.log(_.functions(file))
    /*jshint validthis:true*/
    // Do nothing if no contents
    if (file.isNull()) {
      return callback();
    }

    if (file.isStream()) {
      // this.push(file);

      // http://nodejs.org/api/stream.html
      // http://nodejs.org/api/child_process.html
      // https://github.com/dominictarr/event-stream

      // accepting streams is optional
      this.emit("error",
        new gutil.PluginError("gulp-gulp", "Stream content is not supported"));
      return callback();
    }

    // check if file.contents is a `Buffer`
    if (file.isBuffer()) {

      // manipulate buffer in some way
      // http://nodejs.org/api/buffer.html
      file.contents = new Buffer(String(file.contents) + "\n" + param);


      // this.push(file.contents);
      // console.log(this)
    }
    return callback();
  }

  return through.obj(gulp);
};
