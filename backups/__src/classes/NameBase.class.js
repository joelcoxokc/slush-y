;(function(){

  'use strict';

    var _        = require('lodash');
    var util     = require('util');
    var Base     = require('./Base.class');


    function NameBase (param) {

      Base.apply(this, arguments);

      var __this = this;

    }

    util.inherits(NameBase, Base);

    _.extend(NameBase.prototype, require('../controllers/NameBase.controller'))

    NameBase.prototype.publicMethod = function() {};


}).call(this);