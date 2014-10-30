(function(){
  'use strict';


  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    // module.exports = function( $, paths, filters, templates, slushy){

    module.exports = function( slushy, filters, templates, $, _ ){

        var _this = this;

        /**
         * Generator the server
         */
        slushy
          .src( templates.server.base.all() )
            .pipe($.template( filters ))
            .pipe($.conflict( _this.dirs.server ) )
            .pipe( slushy.dest( _this.dirs.server ) )

        /**
         * Generate all static assets, and root level files
         */
        slushy
          .src( templates.static.base.all() )
            .pipe($.rename( _this.files().replace ) )
            .pipe($.template( filters ))
            .pipe($.conflict( _this.dirs.root ) )
            .pipe( slushy.dest( _this.dirs.root ) )

        /**
         * Generate client from chosen script directory type!
         */
        slushy
          .src( templates.client.base.all() )
            .pipe($.rename( _this.files().replace ) )
            .pipe($.template( filters ))
            .pipe($.conflict( _this.dirs.app ))
            .pipe( slushy.dest( _this.dirs.app ))
        /**
         * Generate client scritps from chosen HTTPrequest handler type
         */
        slushy
          .src( templates.client.options[filters.httpType].all() )
            .pipe($.rename( _this.files().replace ) )
            .pipe($.template( filters ))
            .pipe($.conflict(_this.dirs.app))
            .pipe( slushy.dest( _this.dirs.app ));

        // slushy
        //   .src('./bower.json')
        //   .pipe($.install())
        //   .on('end', function(){
        //   })
        //     _this.done();

    }
})();