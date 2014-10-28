;(function(){
  'use strict';

  angular
    .module('<%= moduleNames.slug %>')
    .factory('<%= names.single.classed %>', <%= names.single.classed %>);

  /* @inject */
  function <%= names.single.classed %>() {

    // Define private variables here . . .

    // Define Public API
    var instance = {
      one: one,
      two: two,
      three: three
    };

    return instance;

    // <%= names.single.humanized %> service logic
    ///////////////////

    /**
     * [someMethod description]
     * @return {[type]} [description]
     */
    function one() { return 1; }

    /**
     * [two description]
     * @return {[type]} [description]
     */
    function two() { return 2; }

    /**
     * [three description]
     * @return {[type]} [description]
     */
    function three() { return 3; }

  }
}).call(this);