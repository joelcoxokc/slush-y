;(function(){

  'use strict';

    var _        = require('lodash');
    var util     = require('util');
    var Utility  = require('./Utility.class');


    function Base (param) {

      Utility.apply(this, arguments);

      var __this = this;

    }

    util.inherits(Base, Utility);

    _.extend(Base.prototype, require('../controllers/Base.controller'))

    Base.prototype.publicMethod = function() {};


}).call(this);