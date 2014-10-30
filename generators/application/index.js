(function(){
  'use strict';


  /**
   * Function is bound the Slushy Prototype
   * @return {Function} [the callback function for gulp to call]
   */

    // module.exports = function( $, paths, filters, templates, slushy){
    module.exports = function( slushy, answers, $, _ ){

        var _this = this;


        // /**
        //  * Generator the server
        //  */
        // slushy
        //   .src( this.templates.server.base.all() )
        //     .pipe($.template( filters ))
        //     .pipe($.conflict('./server') )
        //     .pipe( slushy.dest( slushy.end.server ) )

        // // /**
        // //  * Generate all static assets, and root level files
        // //  */
        // slushy
        //   .src( templates.static.base.all() )
        //     .pipe($.rename( _this.files().replace ) )
        //     .pipe($.template( filters ))
        //     .pipe($.conflict( slushy.end.root ) )
        //     .pipe( slushy.dest( slushy.end.root ) )

        // // /**
        // //  * Generate client from chosen script directory type!
        // //  */
        // slushy
        //   .src( templates.client.base.all() )
        //     .pipe($.rename( _this.files().replace ) )
        //     .pipe($.template( filters ))
        //     .pipe($.conflict('./'))
        //     .pipe( slushy.dest( slushy.end.app ))
        // // /**
        // //  * Generate client scritps from chosen HTTPrequest handler type
        // //  */
        // slushy
        //   .src( templates.client.options[filters.httpType].all() )
        //     .pipe($.rename( _this.files().replace ) )
        //     .pipe($.template( filters ))
        //     .pipe($.conflict('./'))
        //     .pipe( slushy.dest( slushy.end.app ));

        // slushy
        //   .src('./bower.json')
        //   .pipe($.install())
        //   .on('end', function(){
        //   })
        //     _this.done();

    }
})();