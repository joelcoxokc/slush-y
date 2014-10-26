(function(){
  'use strict';

  module.exports = function($, client, tmp, dist, gulp){


    var tasks = {
      cleaner:    cleaner
    };

    var options = {
      inject: {
        head: {
          starttag: '<!-- HEAD -->',
          endtag: '<!-- END:HEAD -->',
          transform: transform
        },
        body: {
          starttag: '<!-- BODY -->',
          endtag: '<!-- END:BODY -->',
          transform: transform
        }
      }
    };


    return tasks;


    /////////////////////////



    function cleaner(done){
      var head = gulp.src( './gulp/injector/head.html' );
      var body = gulp.src( './gulp/injector/body.html' );

      return gulp.src( client.index )
        .pipe( $.inject(head, options.inject.head ))
        .pipe( $.inject(body, options.inject.body ))
        .pipe( gulp.dest( client.root ) );
    }

    function transform(filePath, file){

      return file.contents.toString('utf8');
    }

  };

})();