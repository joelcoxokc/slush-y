(function(){
  'use strict';


  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    // module.exports = function( $, paths, filters, templates, slushy){

    module.exports = function( slushy, config, filters, templates, $, _ ){

        var _this = this;

        // Application Generator Tasks
        ////////////////////////////////

        server();
        statics();
        base();
        options();


        /**
         * Generator the server
         */
        function server(){
          slushy
            .src( templates.server.base.all() )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.dirs.server ) )
              .pipe( slushy.dest( _this.dirs.server ) )
        }

        /**
         * Generate all static assets, and root level files
         */
        function statics(){
          slushy
            .src( templates.static.base.all() )
              .pipe($.rename( _this.files().replace ) )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.dirs.root ) )
              .pipe( slushy.dest( _this.dirs.root ) )
        }

        /**
         * Generate client from chosen script directory type!
         */
        function base(){
          slushy
            .src( templates.client.base.all() )
              .pipe($.rename( _this.files().replace ) )
              .pipe($.template( filters ))
              .pipe($.conflict( _this.dirs.app ))
              .pipe( slushy.dest( _this.dirs.app ))
        }

        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        function options(){
          slushy
            .src( templates.client.options[filters.httpType].all() )
              .pipe($.rename( _this.files().replace ) )
              .pipe($.template( filters ))
              .pipe($.conflict(_this.dirs.app))
              .pipe( slushy.dest( _this.dirs.app ));
        }
        // slushy
        //   .src('./bower.json')
        //   .pipe($.install())
        //   .on('end', function(){
        //   })
        //     _this.done();

    }
})();