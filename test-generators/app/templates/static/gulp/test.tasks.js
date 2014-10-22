(function(){
  'use strict';
  var mainBowerFiles = require('main-bower-files');
  module.exports = function($, client, tmp, dist, gulp){


    var tasks = {
      inject:    inject,
      moveBower: moveBower
    };

    var options = {
      inject: {
        client: {
          starttag: 'client= [',
          endtag: '];',
          addRootSlash: false,
          transform: transform
        },
        bower: {
          starttag: '/* @end:bower */',
          endtag: '/* @end:bower */',
          addRootSlash: false,
          transform: transform
        }
      }
    };

    return tasks;


    /////////////////////////



    function inject(){
      var bower = mainBowerFiles({
        paths: {
          bowerrc: './.bowerrc',
          bowerJson: './bower.json',
          includeDev: true
        }
      })
      return gulp.src('./karma.conf.js')
      .pipe( $.inject( gulp.src(bower), {
        starttag: '/* @bower */',
        endtag: '/* @end:bower */',
        addRootSlash: false,
        transform: function (filepath, file, i, length) {
          return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
        }
      }))
      // .pipe( $.inject( gulp.src(client.specs), {
      //     starttag: 'client= [',
      //     endtag: ']',
      //     addRootSlash: false,
      //     transform: function (filepath, file, i, length) {
      //       return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
      //     }
      //   }
      // ))
      .pipe( gulp.dest('./') );
    }

    function moveBower(){
      var bower = mainBowerFiles({
        paths: {
          bowerrc: './.bowerrc',
          bowerJson: './bower.json',
          includeDev: true
        }
      })
      return gulp.src(bower)
        .pipe(gulp.dest( tmp.bower ))
    }


    function transform(filepath, file, i, length){

      return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
    }

    function mainBowerFiles(){
      var bower = mainBowerFiles({
        paths: {
          bowerrc: './.bowerrc',
          bowerJson: './bower.json',
          includeDev: true
        }
      });
      return bower;
    }

  };

})();